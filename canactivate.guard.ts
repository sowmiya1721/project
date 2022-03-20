import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RouterService } from './router.service';
import { AuthenticationService } from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class CanactivateGuard implements CanActivate {
  constructor(private routegaurd:RouterService, private authservice:AuthenticationService ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // let unam = sessionStorage.getItem("username");
      // let pass= sessionStorage.getItem("password");
      // // let uname = sessionStorage.getItem("user");
      // // let password= sessionStorage.getItem("password");
      // if(unam!="user" || pass!="passuser"){
      //   this.routegaurd.openLogin();
      //   alert("check the username and password");
      //   return false;
      // }
     
      // return true;

      let tok=this.authservice.getMytoken();

     if(tok==null)
     {
       this.routegaurd.openLogin();
       return false;
     }

    
    
      return true;
  }

  }
  

