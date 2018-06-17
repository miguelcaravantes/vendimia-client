import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ItemService {

    constructor(private apollo: Apollo) {
    }

    getList(): Observable<any[]> {
        return this.apollo.query<any>(
            {
                query: gql`{
                    items{
                        id
                        code
                        description
                        model
                        price
                        stock
                    }
        }`
            }
        ).pipe(map(({ data }) => data.items));
    }


    get(id: string): Observable<object> {
        const query = gql`
            query item($id: ID!) {
                item(id: $id) {
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
            variables:
            {
                id
            }
        }).pipe(map(({ data }) => data.item));
    }



    create(input: object): Observable<void> {
        const mutation = gql`
    mutation createItem($input: ItemInput!){
      createItem(item: $input)
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
    mutation updateItem($id: ID!, $input: ItemInput!){
      updateItem(id: $id, item: $input)
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
    mutation deleteItem($id: ID!){
      deleteItem(id: $id)
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
                itemNextCode
            }
            `;
        return this.apollo.query<any>({
            query,
        }).pipe(map(({ data }) => data.itemNextCode));
    }

}
