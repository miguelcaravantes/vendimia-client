import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {

    constructor(private apollo: Apollo) {
    }

    getList(): Observable<any[]> {
        return this.apollo.query<any>(
            {
                query: gql`{
                    customers{
                        id
                        code
                        firstName
                        lastName
                        mothersLastName
                        rfc
                    }
        }`
            }
        ).pipe(map(({ data }) => data.customers));
    }


    get(id: string): Observable<object> {
        const query = gql`
            query customer($id: ID!) {
                customer(id: $id) {
                    id
                    firstName
                    lastName
                    mothersLastName
                    rfc
                }
            }
            `;
        return this.apollo.query<any>({
            query,
            variables:
            {
                id
            }
        }).pipe(map(({ data }) => data.customer));
    }



    create(input: object): Observable<void> {
        const mutation = gql`
    mutation createCustomer($input: CustomerInput!){
      createCustomer(customer: $input)
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


    update(id: string, input: object): Observable<void> {
        const mutation = gql`
    mutation updateCustomer($id: ID!, $input: CustomerInput!){
      updateCustomer(id: $id, customer: $input)
      }
    `;
        return this.apollo.mutate({
            mutation,
            variables:
            {
                id,
                input
            }
        }).pipe(map(res => null));
    }


    delete(id: string): Observable<void> {
        const mutation = gql`
    mutation deleteCustomer($id: ID!){
      deleteCustomer(id: $id)
      }
    `;
        return this.apollo.mutate({
            mutation,
            variables:
            {
                id
            }
        }).pipe(map(res => null));
    }


    nextCode(): Observable<object> {
        const query = gql`
            query {
                customerNextCode
            }
            `;
        return this.apollo.query<any>({
            query,
        }).pipe(map(({ data }) => data.customerNextCode));
    }

}
