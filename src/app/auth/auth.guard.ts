import { Injectable } from '@angular/core';
import { AuthenticationService } from '../shared/services/authentication.service';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGaurd implements CanActivate {

    constructor(private router: Router,
      private authService: AuthenticationService) {
       }
  
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
     
        if(localStorage.getItem('currentUser')){
          return true;
        }
      this.router.navigate(['/login']);
      return false;
  
    }
  
  }