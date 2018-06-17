import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { ConfigurationService } from '../share/configuration.service';


@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  form: FormGroup;
  title: string;
  saving: boolean;

  constructor(private formBuilder: FormBuilder,
    private configurationService: ConfigurationService,
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
        financeRate: [null],
        downPayment: [null],
        deadline: [null],
      }
    );
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    const value = this.form.value;

    const obs = this.configurationService.update(value);

    this.saving = true;
    obs
      .pipe(finalize(() => this.saving = false))
      .subscribe(
        this.onSaved.bind(this),
        this.onSaveError.bind(this),
    );
  }

  goBack() {
    this.router.navigate(['/']);
  }


  private onSaved() {
    this.toastr.success(`Bien Hecho. La configuración ha sido registrada`);
    this.goBack();
  }
  private onSaveError() {
    this.toastr.error('Error al guardar');
  }

  private recoveryRouteData() {
    this.route.data.subscribe(data => {
      this.title = data.title;
      this.form.patchValue(data.configuration);
    });
  }
}
