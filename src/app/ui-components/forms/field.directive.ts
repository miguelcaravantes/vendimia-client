import { NgControl } from '@angular/forms';
import { Directive, ViewChild, AfterContentInit, ContentChild, OnInit } from '@angular/core';
import { PendingFieldDirective } from './pending-field.directive';
import { FieldErrorDirective } from './field-error.directive';
import { MatInput } from '@angular/material';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'mat-form-field'
})
export class FieldDirective implements AfterContentInit, OnInit {

  @ContentChild(NgControl) ngControl: NgControl;
  @ContentChild(FieldErrorDirective) inputError: FieldErrorDirective;
  @ContentChild(PendingFieldDirective) pendingField: PendingFieldDirective;
  @ContentChild(MatInput) matInput: MatInput;


  constructor() {
  }

  ngOnInit(): void {
  }
  ngAfterContentInit(): void {
    if (this.inputError) {
      this.inputError.control = this.ngControl;
      this.inputError.placeholder = this.matInput.placeholder;
    }

    if (this.pendingField) {
      this.pendingField.control = this.ngControl;
    }
  }

}


