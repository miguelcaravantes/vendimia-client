import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { DetailTypes } from '../core/models/detail-types';
import { CustomerResolver } from './shared/customer.resolver';
import { CustomerNextCodeResolver } from './shared/customer-next-code.resolver';

const routes: Routes = [
  {
    component: CustomerListComponent,
    path: 'customers'
  },
  {
    component: CustomerDetailComponent,
    path: 'customers/create',
    data: {
      title: 'Registro de Clientes',
      type: DetailTypes.Create,
    },
    resolve: {
      nextCode: CustomerNextCodeResolver
    }
  },
  {
    component: CustomerDetailComponent,
    path: 'customers/edit/:id',
    data: {
      title: 'Editar Cliente',
      type: DetailTypes.Edit,
    },
    resolve: {
      customer: CustomerResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomersRoutingModule { }
