import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigurationComponent } from './configuration/configuration.component';
import { ConfigurationResolver } from './share/configuration.resolver';

const routes: Routes = [
  {
    path: 'configuration',
    component: ConfigurationComponent,
    data: {
      title: 'Configuración General',
    },
    resolve: {
      configuration: ConfigurationResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule { }
