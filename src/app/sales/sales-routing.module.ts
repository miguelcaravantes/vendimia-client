import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateSaleComponent } from './create-sale/create-sale.component';
import { CreateSalesDependencyResolver } from './shared/create-sales-dependency.service';
import { SaleListComponent } from './sale-list/sale-list.component';
import { SaleNextCodeResolver } from './shared/sale-next-code.resolver';

const routes: Routes = [
  {
    path: 'sales',
    component: SaleListComponent,
  },
  {
    path: 'sales/create',
    component: CreateSaleComponent,
    resolve: {
      dependencies: CreateSalesDependencyResolver,
      nextCode: SaleNextCodeResolver

    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
