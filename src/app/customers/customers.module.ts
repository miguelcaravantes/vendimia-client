import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { SharedModule } from '../shared/shared.module';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { UiComponentsModule } from '../ui-components/ui-components.module';

@NgModule({
  imports: [
    SharedModule,
    UiComponentsModule,
    CustomersRoutingModule
  ],
  declarations: [CustomerListComponent, CustomerDetailComponent]
})
export class CustomersModule { }
