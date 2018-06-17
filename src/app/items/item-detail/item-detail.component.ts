import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ItemService } from '../shared/item.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { DetailTypes } from '../../core/models/detail-types';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {

  detailTypes = DetailTypes;
  form: FormGroup;
  type: DetailTypes;
  title: string;
  saving: boolean;
  id: string;
  code: number;
  get formatedCode() { return this.code ? this.code.toString().padStart(4, '0') : ''; }

  constructor(private formBuilder: FormBuilder,
    private itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }


  // TODO validate number fields
  // TODO get only the necesary fields on queries
  ngOnInit() {
    this.buildForm();
    this.recoveryRouteData();
  }

  buildForm() {
    this.form = this.formBuilder.group(
      {
        description: [null, [Validators.required], null,
          {
            required: 'No es posible continuar, debe ingresar [name] es obligatorio.'
          }
        ],
        model: [null],
        price: [null, [Validators.required], null,
          {
            required: 'No es posible continuar, debe ingresar [name] es obligatorio.'
          }
        ],
        stock: [null, [Validators.required], null,
          {
            required: 'No es posible continuar, debe ingresar [name] es obligatorio.'
          }
        ],
      }
    );
  }
  goBack() {
    this.router.navigate(['/items']);
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    const value = this.form.value;

    const obs = this.type === DetailTypes.Create ?
      this.itemService.create(value) :
      this.itemService.update(this.id, value);

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
    this.toastr.success(`Bien Hecho. El articulo ha sido ${actionMessage} correctamente`);
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
        this.id = data.item.id;
        this.form.patchValue(data.item);
      } else if (this.type === DetailTypes.Create) {
        this.code = data.nextCode;
      }
    });
  }
}
