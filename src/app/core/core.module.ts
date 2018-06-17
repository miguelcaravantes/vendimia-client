import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ToastrModule } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { AppFormBuilder } from './forms/app-form-builder.service';
import { ValidationErrorsService } from './forms/validation-errors.service';


@NgModule({
  imports: [
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    ToastrModule.forRoot(),
  ],
  declarations: [],
  providers:
  [
    {
      provide: FormBuilder,
      useClass: AppFormBuilder
    },
    ValidationErrorsService
  ]
})
export class CoreModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    apollo.create({
      link: httpLink.create({}),
      cache: new InMemoryCache(),
      defaultOptions: {
        query: {
          fetchPolicy: 'network-only',
          errorPolicy: 'all',
        },
        mutate: {
          errorPolicy: 'all'
        }
      }
    });
  }
}
