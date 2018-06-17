import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor(private apollo: Apollo) { }

  get(): Observable<object> {
    const query = gql`
        query {
            configuration {
            financeRate
            downPayment
            deadline
            }
        }
        `;
    return this.apollo.query<any>({
        query
    }).pipe(map(({ data }) => data.configuration));
}




update(input: object): Observable<void> {
    const mutation = gql`
mutation updateConfiguration($input: ConfigurationInput!){
  updateConfiguration(configuration: $input)
  }
`;
    return this.apollo.mutate({
        mutation,
        variables:
        {
            input
        }
    }).pipe(map(res => null));
}

}
