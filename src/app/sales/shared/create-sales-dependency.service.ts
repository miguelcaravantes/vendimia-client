
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { SaleService } from './sale.service';

@Injectable({
    providedIn: 'root'
})
export class CreateSalesDependencyResolver implements Resolve<any> {
    constructor(private salesService: SaleService) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        return this.salesService.getCreateDependencies();
    }
}
