import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CustomerService } from './customer.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CustomerResolver implements Resolve<any> {
    constructor(private customerService: CustomerService) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        return this.customerService.get(route.params.id);
    }
}
