import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SaleService {

    constructor(private apollo: Apollo) {
    }

    getList(): Observable<any[]> {
        const query = gql`{
            sales{
                id
                code
                customer {
                    code,
                    code
                    firstName
                    lastName
                    mothersLastName
                }
                total
                creationDate
            }
        }`;
        return this.apollo.query<any>(
            {
                query
            }
        ).pipe(map(({ data }) => data.sales));
    }


    getCreateDependencies(): Observable<any[]> {
        const query = gql`
        query getCreateDependencies {
            customers {
              id
              code
              firstName
              lastName
              mothersLastName
              rfc
            },
            items {
                id
                code
                description
                model
                price
                stock
          }
     }
    `;
        return this.apollo.query<any>({
            query,
        }).pipe(map(({ data }) => data));
    }

    checkStock(id: string): Observable<number> {
        const query = gql`
            query checkStock($id: ID!) {
                item(id: $id) {
                    stock
                }
            }
            `;
        return this.apollo.query<any>({
            query,
            variables:
            {
                id
            }
        }).pipe(map(({ data }) => data.item.stock));
    }

    calculateSale(sale: any): Observable<any> {
        const query = gql`
            query calculateSale($input: PreSaleInput!) {
                calculateSale(sale: $input) {
                    details {
                        itemId
                        price
                        amount
                    }
                    downPayment
                    downPaymentBonus
                    total
                    monthlyPayments
                    {
                        numberOfMonths
                        monthlyPayment
                        total
                        saving
                    }
                }
            }
            `;
        return this.apollo.query<any>({
            query,
            variables:
            {
                input: sale
            }
        }).pipe(map(({ data }) => data.calculateSale));
    }

    createSale(sale: any) {
        const mutation = gql`
        mutation createSale($input: SaleInput!) {
            createSale(sale: $input)
        }
        `;
        return this.apollo.mutate<any>({
            mutation,
            variables:
            {
                input: sale
            }
        }).pipe(map(({ data }) => data.calculateSale));
    }

    nextCode(): Observable<object> {
        const query = gql`
            query {
                saleNextCode
            }
            `;
        return this.apollo.query<any>({
            query,
        }).pipe(map(({ data }) => data.saleNextCode));
    }


}
