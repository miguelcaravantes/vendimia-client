import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldDirective } from './forms/field.directive';
import { PendingFieldDirective } from './forms/pending-field.directive';
import { MaterialModule } from '../material.module';
import { FieldErrorDirective } from './forms/field-error.directive';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [FieldDirective, PendingFieldDirective, FieldErrorDirective],
  exports: [FieldDirective, FieldErrorDirective, PendingFieldDirective],
})
export class UiComponentsModule { }
