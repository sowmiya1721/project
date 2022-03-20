import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { RouterService } from 'src/server/router.service';
import { AuthenticationService } from '../../server/authentication.service';
import { User } from '../user';
import { ProductserviceService } from 'src/server/productservice.service';


@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {

  userobj :User=new User();

  emailid= new FormControl();
  password= new FormControl();
  constructor(private myroute:RouterService,private authservice : AuthenticationService ,private nutriservice:ProductserviceService) {
    this.emailid=new FormControl('',Validators.required);
    this.password=new FormControl('',[Validators.required,Validators.minLength(6)]);
   }

  ngOnInit(): void {
  }
  
  login()
  {
  
let data = {
        "emailid": this.emailid.value,
        "password":this.password.value
          }

    this.authservice.fetchTokenfromserver(data).subscribe (
    (res:any)=>
    {
    console.log(res);
    this.authservice.storeMytoken(res["token"]);
    sessionStorage.setItem("usermail",this.emailid.value);
   

    this.authservice.storeMyemailid(res["emailid"]);
    sessionStorage.setItem("emailid",this.emailid.value);
   
      this.myroute.openUserview();
    },
    (err:any)=>console.log(err.error)
    )

 
 }

 validateemail():string{
  if(this.emailid.touched && this.emailid.invalid){
    return "email cannot be null";
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


  signup(){
    this.nutriservice.addCustomer(this.userobj).subscribe(
      (res:any)=>{
        console.log(res);
        alert("Successfully registered") ;
        
      },
      (err:any)=>console.log(err)
    )

  }
  
}
