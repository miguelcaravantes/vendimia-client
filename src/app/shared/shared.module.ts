import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmComponent } from './ui/confirm/confirm.component';
import { UiComponentsModule } from '../ui-components/ui-components.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    UiComponentsModule,
  ],
  exports:
  [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    UiComponentsModule,
    ConfirmComponent
  ],
  entryComponents: [ConfirmComponent],
  declarations: [ConfirmComponent]
})
export class SharedModule { }
