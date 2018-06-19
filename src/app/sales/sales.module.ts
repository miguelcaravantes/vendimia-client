import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { CreateSaleComponent } from './create-sale/create-sale.component';
import { SharedModule } from '../shared/shared.module';
import { SaleListComponent } from './sale-list/sale-list.component';

@NgModule({
  imports: [
    SharedModule,
    SalesRoutingModule
  ],
  declarations: [CreateSaleComponent, SaleListComponent]
})
export class SalesModule { }
