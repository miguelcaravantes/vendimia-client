import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateSaleComponent } from './create-sale/create-sale.component';
import { CreateSalesDependencyResolver } from './shared/create-sales-dependency.service';

const routes: Routes = [
  {
    path: 'sales',
    component: CreateSaleComponent,
    resolve: {
      dependencies: CreateSalesDependencyResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
