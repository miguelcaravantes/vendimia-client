import { AbstractControl, ValidatorFn, ValidationErrors, Validators, FormArray } from '@angular/forms';

function isEmptyInputValue(value: any): boolean {
    return value == null || value.length === 0;
}
const EMAIL_REGEXP =
    // tslint:disable-next-line:max-line-length
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export class CoreValidators {



    static minValue(min: any): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (isEmptyInputValue(control.value)) {
                return null;
            }
            return control.value >= min ? null : { 'minValue': true };
        };
    }

    static maxValue(max: any): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (isEmptyInputValue(control.value)) {
                return null;
            }
            return control.value <= max ? null : { 'maxValue': true };
        };
    }


    static email(control: AbstractControl): ValidationErrors | null {
        return (!control.value || EMAIL_REGEXP.test(control.value)) ? null : { 'email': true };
    }

    static notEmail(control: AbstractControl): ValidationErrors | null {
        return (!control.value || !EMAIL_REGEXP.test(control.value)) ? null : { 'notEmail': true };
    }

    static equalTo(field: string): ValidatorFn {
        let compareControl;
        return (control: AbstractControl): ValidationErrors | null => {
            if (!compareControl) {
                setTimeout(() => {
                    compareControl = control.parent.get(field);
                    compareControl.valueChanges.distinctUntilChanged().subscribe(i => control.updateValueAndValidity());
                    control.updateValueAndValidity();
                });
                return null;
            } else {
                return !compareControl || compareControl.value === control.value ? null : { 'equalTo': true };
            }
        };
    }


    static autocomplete(validator: (value: any) => boolean): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const result = validator(control.value);
            return result ? null : { 'autocomplete': true };
        };
    }

    static arrayNotEmpty(control: FormArray): ValidationErrors | null {
        return (control.controls.length > 0) ? null : { 'arrayNotEmpty': true };
    }


}
