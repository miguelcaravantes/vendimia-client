import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ConfigurationService } from './configuration.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationResolver implements Resolve<any> {
  constructor(private configurationService: ConfigurationService) { }

  resolve(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
      return this.configurationService.get();
  }
}
