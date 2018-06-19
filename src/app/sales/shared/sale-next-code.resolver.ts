import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SaleService } from './sale.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SaleNextCodeResolver implements Resolve<any> {
    constructor(private saleService: SaleService) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        return this.saleService.nextCode();
    }
}
