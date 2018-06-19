import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { filter, map, count, switchMap, distinctUntilChanged } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { SaleService } from '../shared/sale.service';
import { ToastrService } from 'ngx-toastr';
import { SaleDetail } from '../shared/sale-detail.model';
import { CoreValidators } from '../../core/forms/core-validators';

@Component({
    selector: 'app-create-sale',
    templateUrl: './create-sale.component.html',
    styleUrls: ['./create-sale.component.scss']
})
export class CreateSaleComponent implements OnInit {

    form: FormGroup;
    get detailFormArray(): FormArray { return this.form.get('details') as FormArray; }
    itemControl = new FormControl();

    filteredCustomers: Observable<any[]>;
    filteredItems: Observable<any[]>;
    selectedCustomerRfc: Observable<string>;
    changing = false;
    customers = [];
    items = [];
    code: number;
    get formatedCode() { return this.code ? this.code.toString().padStart(4, '0') : ''; }

    downPayment: number;
    downPaymentBonus: number;
    total: number;
    monthlyPaymentStep: boolean;
    monthlyPayments: any[] = [];

    constructor(private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private salesService: SaleService,
        private router: Router,
        private toastr: ToastrService,
    ) { }

    fullName(customer) {
        return customer ?
            [customer.firstName, customer.lastName, customer.mothersLastName].filter(c => c).join(' ') :
            null;
    }

    formatCode(code: string) {
        return code.toString().padStart(4, '0');
    }

    ngOnInit() {
        this.buildForm();
        this.recoveryRouteData();

        this.selectedCustomerRfc = this.form.get('customerId').valueChanges
            .pipe(
                map(v => this.customers.find(c => c.id === v)),
                map(c => c ? `RFC: ${c.rfc}` : '')
            );

        this.filteredCustomers = this.form.get('customerId').valueChanges
            .pipe(
                filter((t: string) => t.length >= 3),
                map(t => t ? this.filterCustomers(t) : this.customers.slice())
            );
        this.filteredItems = this.itemControl.valueChanges
            .pipe(
                filter((t: string) => t.length >= 3),
                map(t => t ? this.filterItems(t) : this.customers.slice())
            );

        this.detailFormArray.valueChanges.pipe(
            distinctUntilChanged(),
            filter(value =>
                value.length > 0 &&
                value.filter(d => d.quantity === null).length === 0
            ),
            filter(_ => !this.changing)
        ).subscribe(value => {
            this.salesService.calculateSale({ details: value }).subscribe(res => {
                this.downPayment = res.downPayment;
                this.downPaymentBonus = res.downPaymentBonus;
                this.total = res.total;
                this.monthlyPayments = res.monthlyPayments;
                this.changing = true;
                this.detailFormArray.patchValue(res.details);
                this.changing = false;
            });

        });

    }



    buildForm() {
        this.form = this.formBuilder.group(
            {
                customerId: [null, [
                    Validators.required,
                    CoreValidators.autocomplete(v => this.customers.find(c => c.id === v) != null)],
                    null,
                    {
                        required: 'No es posible continuar, debe ingresar [name] es obligatorio.',
                        autocomplete: 'Debe seleccionar un cliente válido'
                    }
                ],
                details: this.formBuilder.array([], [CoreValidators.arrayNotEmpty]),
                numberOfMonths: [null, [Validators.required], null,
                    {
                        required: 'Debe seleccionar un plazo para realizar el pago de su compra.'

                    }]
            }
        );

        this.form.get('numberOfMonths').disable();

    }
    /* 
        trackBy = (index: number) =>
        {
            return this.detailFormArray.get(index.toString()).get('itemId').value;
    
        } */



    addDetailForm(item) {
        const detailForm = this.formBuilder.group(
            {
                itemId: [item.id],
                quantity: [0, [Validators.min(1)]],
                description: [item.description],
                model: [item.model],
                price: [0],
                amount: [0]
            }
        );

        detailForm.get('description').disable();
        detailForm.get('model').disable();
        detailForm.get('price').disable();
        detailForm.get('amount').disable();

        this.detailFormArray.push(detailForm);

        detailForm.get('quantity').valueChanges.pipe(
            distinctUntilChanged(),
            filter(_ => !this.changing),
            filter(v => v !== null),
            switchMap(quantity => this.salesService.checkStock(item.id).pipe(map(stock => ({ stock, quantity })))),
            filter(r => r.stock < r.quantity)
        ).subscribe(r => {
            this.toastr.warning(`El artículo ${item.description} solo cuenta con ${r.stock} unidades.`);
            this.changing = true;
            detailForm.get('quantity').setValue(r.stock);
            this.changing = false;
        });
    }

    removeDetailForm = (index) =>
        this.detailFormArray.removeAt(index)



    addItem() {
        const itemId = this.itemControl.value;
        const item = this.items.find(i => i.id === itemId);

        if (item) {
            this.salesService.checkStock(item.id)
                .pipe(map(stock => stock > 0))
                .subscribe(
                    hasStock => {
                        if (hasStock) {
                            const existingItem = this.detailFormArray.value.find(i => i.itemId === itemId);
                            if (existingItem) {
                                this.toastr.warning('Ya existe un detalle para este artículo');
                            } else {
                                this.addDetailForm(item);
                            }
                        } else {
                            this.toastr.warning('El artículo seleccionado no cuenta con existencia, favor de verificar.');
                        }
                    }
                );
        } else {
            this.toastr.warning('Debe seleccionar un artículo primero');
        }
    }




    next() {

        if (this.form.valid) {
            this.monthlyPaymentStep = true;
            this.form.get('numberOfMonths').enable();
        } else {
            this.toastr.warning('Los datos ingresados no son correctos, favor de verificar');
        }
    }

    save() {

        if (this.form.valid) {
            this.salesService.createSale(this.form.value).subscribe(
                () => {
                    this.toastr.success('Bien Hecho, Tu venta ha sido registrada correctamente');
                    this.goBack();
                },
                () => this.toastr.error('Ocurrio un error al registrar tu venta')
            );
        } else {
            if (!this.form.get('numberOfMonths').valid) {
                this.toastr.warning('Debe seleccionar un plazo para realizar el pago de su compra.');
            }
        }
    }

    goBack() {
        this.router.navigate(['/sales']);
    }


    displayCustomerWith = (id: string) => {
        if (id) {
            const customer = this.customers.find(c => c.id === id);
            const name = this.fullName(customer);
            const code = this.formatCode(customer.code);
            return `${code} ${name}`;
        }
        return null;
    }


    displayItemsWith = (id: string) => {
        if (id) {
            const item = this.items.find(c => c.id === id);
            const code = this.formatCode(item.code);
            return `${code} ${item.description}`;
        }
        return null;
    }


    private filterCustomers(name: string) {
        return this.customers.filter(c =>
            this.fullName(c).toLowerCase().indexOf(name.toLowerCase()) === 0);
    }

    private filterItems(name: string) {
        return this.items.filter(c =>
            c.description.toLowerCase().indexOf(name.toLowerCase()) === 0);
    }


    private recoveryRouteData() {
        this.route.data.subscribe(data => {
            Object.assign(this, data.dependencies);
            this.code = data.nextCode;
        });
    }


}
