import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from '../shared/customer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { DetailTypes } from '../../core/models/detail-types';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {

  detailTypes = DetailTypes;
  form: FormGroup;
  type: DetailTypes;
  title: string;
  saving: boolean;
  id: string;
  code: number;
  get formatedCode() { return this.code ? this.code.toString().padStart(4, '0') : ''; }

  constructor(private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }



  ngOnInit() {
    this.buildForm();
    this.recoveryRouteData();
  }

  buildForm() {
    this.form = this.formBuilder.group(
      {
        firstName: [null, [Validators.required], null,
          {
            required: 'No es posible continuar, debe ingresar [name] es obligatorio.'
          }
        ],
        lastName: [null, [Validators.required], null,
          {
            required: 'No es posible continuar, debe ingresar [name] es obligatorio.'
          }
        ],
        mothersLastName: [null, [Validators.required], null,
          {
            required: 'No es posible continuar, debe ingresar [name] es obligatorio.'
          }
        ],
        rfc: [null, [Validators.required], null,
          {
            required: 'No es posible continuar, debe ingresar [name] es obligatorio.'
          }
        ],
      }
    );
  }
  goBack() {
    this.router.navigate(['/customers']);
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    const value = this.form.value;

    const obs = this.type === DetailTypes.Create ?
      this.customerService.create(value) :
      this.customerService.update(this.id, value);

    this.saving = true;
    obs
      .pipe(finalize(() => this.saving = false))
      .subscribe(
        this.onSaved.bind(this),
        this.onSaveError.bind(this),
    );
  }

  private onSaved() {
    const actionMessage = this.type === DetailTypes.Create ? 'registrado' : 'actualizado';
    this.toastr.success(`Bien Hecho. El cliente ha sido ${actionMessage} correctamente`);
    this.goBack();
  }
  private onSaveError() {
    this.toastr.error('Error al guardar');
  }



  private recoveryRouteData() {
    this.route.data.subscribe(data => {
      this.type = data.type;
      this.title = data.title;
      if (this.type === DetailTypes.Edit) {
        this.id = data.customer.id;
        this.form.patchValue(data.customer);
      } else if (this.type === DetailTypes.Create) {
        this.code = data.nextCode;
      }
    });
  }
}
