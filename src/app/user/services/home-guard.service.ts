import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HomeGuardService implements CanActivate {

  constructor() { }

  canActivate(route: ActivatedRouteSnapshot, state) {
    return true;
  }
}
