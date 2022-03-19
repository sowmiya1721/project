import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { RouterService } from 'src/server/router.service';


@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

  aname= new FormControl();
  password= new FormControl();
  constructor(private myroute:RouterService) {
    this.aname=new FormControl('',Validators.required);
    this.password=new FormControl('',[Validators.required,Validators.minLength(6)]);
   }

  ngOnInit(): void {
  }
  
  login(){
    sessionStorage.setItem("admin",this.aname.value);
    sessionStorage.setItem("password",this.password.value);
    this.myroute.openAdminview();
   
  }

}
