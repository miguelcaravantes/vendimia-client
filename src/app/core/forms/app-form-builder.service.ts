
import { Injectable } from '@angular/core';

import {
  AsyncValidatorFn, ValidatorFn,
  AbstractControl, FormArray, FormControl, FormGroup, FormBuilder
} from '@angular/forms';


@Injectable()
export class AppFormBuilder extends FormBuilder {

  _createControl(controlConfig: any): AbstractControl {
    const control = super['_createControl'](controlConfig);
    if (Array.isArray(controlConfig)) {
      const messages: { [key: string]: string } = controlConfig[3] || {};
      Reflect.set(control, 'validationMessages', messages);
    }
    return control;
  }
}
