import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { CreateSaleComponent } from './create-sale/create-sale.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    SalesRoutingModule
  ],
  declarations: [CreateSaleComponent]
})
export class SalesModule { }
