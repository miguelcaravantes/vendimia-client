import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { filter, map, count } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { SalesService } from '../shared/sales.service';
import { ToastrService } from 'ngx-toastr';
import { SaleDetail } from '../shared/sale-detail.model';

@Component({
    selector: 'app-create-sale',
    templateUrl: './create-sale.component.html',
    styleUrls: ['./create-sale.component.scss']
})
export class CreateSaleComponent implements OnInit {

    form: FormGroup;
    get detailFormArray(): FormArray { return this.form.get('details') as FormArray; }
    itemControl = new FormControl();
    monthsControl = new FormControl();

    filteredCustomers: Observable<any[]>;
    filteredItems: Observable<any[]>;
    selectedCustomerRfc: Observable<string>;

    customers = [];
    items = [];

    configuration: any = {};

    downPayment: number;
    downPaymentBonus: number;
    total: number;
    monthlyPaymentStep: boolean;
    monthlyPayments: any[] = [];

    constructor(private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private salesService: SalesService,
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
        let changing = false;

        this.form.valueChanges.pipe(
            filter(_ =>
                this.detailFormArray.controls.length > 0 &&
                this.detailFormArray.value.filter(d => d.quantity === null).length === 0
            ),
            filter(_ => !changing)
        ).subscribe(value => {
            console.log(value);
            this.salesService.calculateSale(value).subscribe(res => {
                this.downPayment = res.downPayment;
                this.downPaymentBonus = res.downPaymentBonus;
                this.total = res.total;
                this.monthlyPayments = res.monthlyPayments;
                changing = true;
                this.detailFormArray.patchValue(res.details);
                changing = false;
            });

        });


        /*    this.saleDetailsSubject.subscribe(
               saleDetails => {
                   const amount = saleDetails.map(d => d.amount).reduce((a, b) => a + b, 0);
                   this.downPayment = this.saleCalculator.downPayment(amount, this.configuration.downPayment);
                   this.downPaymentBonus = this.saleCalculator.downPaymentBonus(
                       this.downPayment,
                       this.configuration.financeRate,
                       this.configuration.deadline);
                   this.total = this.saleCalculator.total(amount, this.downPayment, this.downPaymentBonus);
   
               }
           ); */
    }

    next() {
        const customerId = this.form.get('customerId').value;
        const customer = this.customers.find(c => c.id === customerId);
        const detailsWithZero = this.detailFormArray.value.filter(e => e.quantity <= 0).length;

        if (!customer || detailsWithZero || this.detailFormArray.value.length === 0) {
            this.toastr.warning('Los datos ingresados no son correctos, favor de verificar');
        } else {
            this.monthlyPaymentStep = true;
        }


    }

    buildForm() {
        this.form = this.formBuilder.group(
            {
                customerId: [null],
                details: this.formBuilder.array([])
            }
        );
    }



    addDetailForm(item) {


        const detailForm = this.formBuilder.group(
            {
                itemId: [item.id],
                quantity: [0],
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
    }

    removeDetailForm = (index) =>
        this.detailFormArray.removeAt(index);



    addItem() {
        const itemId = this.itemControl.value;
        const item = this.items.find(i => i.id === itemId);

        //const saleDetails = this.saleDetailsSubject.value;
        if (item) {
            this.salesService.checkStock(item.id).subscribe(
                hasStock => {
                    if (hasStock) {
                        const existingItem = this.detailFormArray.value.find(i => i.itemId === itemId);
                        if (existingItem) {
                            this.toastr.warning('Ya existe un detalle para este artículo');
                        } else {
                            /*    const saleDetail = new SaleDetail(
                                   item.id,
                                   item.description,
                                   item.model,
                               );
                               this.saleDetailsSubject.next([...saleDetails, saleDetail]);
                               this.changeQuantity(saleDetail, 1); */
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




    trackByFn(item) {
        return item.itemId;
    }

    // TODO validar cantidad
    changeQuantity(saleDetail: SaleDetail, quantity) {
        // using inmutability pattern
        /*   this.saleDetailsSubject.next(this.saleDetailsSubject.value.map(d => {
              if (d === saleDetail) {
                  const item = this.items.find(i => i.id === d.itemId);
                  const price = this.saleCalculator.price(item.price, this.configuration.financeRate, this.configuration.deadline);
                  const amount = this.saleCalculator.amount(price, quantity);
                  return ({
                      ...d, ...{
                          quantity,
                          price,
                          amount
                      }
                  });
              } else {
                  return d;
              }
          })); */

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
        });
    }

    private save() {

    }

}
