import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CustomersModule } from './customers/customers.module';
import { TemplateModule } from './template/template.module';
import { CoreModule } from './core/core.module';
import { ItemsModule } from './items/items.module';
import { ConfigurationModule } from './configuration/configuration.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TemplateModule,
    CustomersModule,
    ItemsModule,
    ConfigurationModule,
    CoreModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
