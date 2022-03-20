import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/server/authentication.service';
import { RouterService } from 'src/server/router.service';


@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

  adminname= new FormControl();
  password= new FormControl();
  constructor(private myroute:RouterService,private authservice:AuthenticationService) {
    this.adminname=new FormControl('',Validators.required);
    this.password=new FormControl('',[Validators.required,Validators.minLength(6)]);
   }

  ngOnInit(): void {
  }
  
  login()
  {
  
let data = {
        "adminname": this.adminname.value,
        "password":this.password.value
          }

    this.authservice.fetchadminTokenfromserver(data).subscribe (
    (res:any)=>
    {
    console.log(res);
    this.authservice.storeMytoken(res["token"]);
    sessionStorage.setItem("Adminname",this.adminname.value);
   

   
      this.myroute.openAdminview();
    },
    (err:any)=>console.log(err.error)
    )

 
 }
 validateuname():string{
  if(this.adminname.touched && this.adminname.invalid){
    return "username cannot be null";
  } else
  return "";
}
validatepass():string{
  if(this.password.touched && this.password.invalid){
    if(this.password.errors?.['required']){
      return "password  cannot be null"
    }else
      return "pass should be minimum 6 chars";
    }else
    return "";
  }

}
