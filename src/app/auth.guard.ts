import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '../../node_modules/@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private routes : Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
      if(localStorage.getItem('username')!= null){
        console.log("In AuthGuard");
    return true;
      }
      else
      {
        this.routes.navigate(['/login']);
        console.log("TO login page from Authguard ");
        return false;
      }
    }
}
