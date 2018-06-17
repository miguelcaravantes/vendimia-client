import { NgModule } from '@angular/core';

import { ItemsRoutingModule } from './items-routing.module';
import { ItemListComponent } from './item-list/item-list.component';
import { SharedModule } from '../shared/shared.module';
import { ItemDetailComponent } from './item-detail/item-detail.component';

@NgModule({
  imports: [
    SharedModule,
    ItemsRoutingModule
  ],
  declarations: [ItemListComponent, ItemDetailComponent]
})
export class ItemsModule { }
