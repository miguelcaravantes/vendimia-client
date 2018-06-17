import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { DetailTypes } from '../core/models/detail-types';
import { ItemNextCodeResolver } from './shared/item-next-code.resolver';
import { ItemResolver } from './shared/item.resolver';

const routes: Routes = [
  {
    component: ItemListComponent,
    path: 'items'
  },
  {
    component: ItemDetailComponent,
    path: 'items/create',
    data: {
      title: 'Registro de Artículos',
      type: DetailTypes.Create,
    },
    resolve: {
      nextCode: ItemNextCodeResolver
    }
  },
  {
    component: ItemDetailComponent,
    path: 'items/edit/:id',
    data: {
      title: 'Editar Artículo',
      type: DetailTypes.Edit,
    },
    resolve: {
      item: ItemResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemsRoutingModule { }
