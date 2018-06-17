import { Injectable } from '@angular/core';
import { AbstractControl, NgControl } from '@angular/forms';

@Injectable()
export class ValidationErrorsService {

    constructor() { }
    processErrors(control: NgControl): string {
        if (control.errors) {
            const errorLines =
                Object.keys(control.errors)
                    .map(key => this.getMessages(control.control, control.errors[key], key));

            return errorLines.join('. ');
        } else {
            return '';
        }
    }

    getMessages(control: AbstractControl, error: object, errorKey: string) {
        const controlMessages = this.getControlMessages(control);
        let result = controlMessages[errorKey];
        if (!result) {
            result = defaultMessages[errorKey];
        }
        if (result) {
            result = this.processMessage(result, error);
        }
        return result === null || result === undefined ? '' : result;
    }

    getControlMessages(control: AbstractControl): { [key: string]: string } {
        return Reflect.get(control, 'validationMessages') || {};
    }

    private processMessage(message: string, error: object): string {
        return message.replace(/{.*?}/g, (match, number) => {
            const prop = match.replace(/{|}/g, '');
            return error[prop];
        });
    }


}


const defaultMessages = {
    required: 'Este campo es requerido',
    email: 'El formato de correo electrónico es incorrecto',
    minlength: 'Lo longitud mínima es de {requiredLength} caracteres',
    maxlength: 'Lo longitud máxima es de {requiredLength} caracteres',
};

