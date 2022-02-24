import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserSessionService } from '../core/user-session.service';
import { htConstants } from '../core/ht-constants';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

constructor(private session:UserSessionService, private router:Router){

}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(!this.session.isLoggedIn){
      this.router.navigate(htConstants.pathLogin);
      return false;
    }

    return true;
  }
  
}
