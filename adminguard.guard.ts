import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { RouterService } from './router.service';


@Injectable({
  providedIn: 'root'
})
export class AdminguardGuard implements CanActivate {

  constructor(private routegaurd:RouterService,private authservice:AuthenticationService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let tok=this.authservice.getMytoken();

     if(tok==null)
     {
       this.routegaurd.openLogin();
       return false;
     }
     return true;
  }
  
}
