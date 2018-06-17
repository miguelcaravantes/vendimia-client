import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [HeaderComponent],
  declarations: [HeaderComponent]
})
export class TemplateModule { }
