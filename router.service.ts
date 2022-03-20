import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import{ Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class RouterService {
  [x: string]: any;

  constructor(private route:Router) { }

  openHome() {
    this.route.navigate(["home"]);
  }
  openLogin() {
    this.route.navigate(["login"]);
  }
  openUserview(){
    this.route.navigate(["userview"]);
  }
  openAdminview(){
    this.route.navigate(["adminview"]);
  }
  openAdminlogin(){
    this.route.navigate(["adminlogin"]);

  }
  openuserlogin(){
    this.route.navigate(["userlogin"]);
  }
  openaboutUs(){
    this.route.navigate(["aboutus"]);
  }
  openfavorite(){
    this.route.navigate(["fav"]);
  }
  openuserprofile(){
    this.route.navigate(["userprofile"]);
  }

  openfaq(){
    this.route.navigate(["faq"]);
  }

  openaddproduct(){
    this.route.navigate(['add']);
  }
  
}
