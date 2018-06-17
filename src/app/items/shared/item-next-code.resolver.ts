import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ItemService } from './item.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ItemNextCodeResolver implements Resolve<any> {
    constructor(private itemService: ItemService) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        return this.itemService.nextCode();
    }
}
