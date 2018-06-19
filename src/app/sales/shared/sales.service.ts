import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SalesService {

    constructor(private apollo: Apollo) {
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
          },
          configuration {
            financeRate
            downPayment
            deadline
          }
     }
    `;
        return this.apollo.query<any>({
            query,
        }).pipe(map(({ data }) => data));
    }

    checkStock(id: string): Observable<boolean> {
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
        }).pipe(map(({ data }) => data.item.stock > 0));
    }

    calculateSale(sale: any): Observable<any> {
        const query = gql`
            query calculateSale($input: SaleInput!) {
                calculateSale(sale: $input) {
                    details {
                        itemId
                        quantity
                        price
                        amount
                    }
                    downPayment
                    downPaymentBonus
                    total
                    monthlyPayments
                    {
                        numberOfmonths
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





}
