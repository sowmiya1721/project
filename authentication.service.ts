import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';



@Injectable()
export class AuthenticationService {
  constructor(private httpClient: HttpClient) {

  }
  fetchTokenfromserver(userdata : any) : Observable<any>
  {
   return  this.httpClient.post('http://localhost:9090/authentication/login',userdata);

  }

  fetchadminTokenfromserver(userdata : any) : Observable<any>
  {
   return  this.httpClient.post('http://localhost:9090/authentication/adminlogin',userdata);

  }

storeMytoken(tok:any)
{
  sessionStorage.setItem("mytoken",tok);
}

getMytoken()
{
  return sessionStorage.getItem("mytoken");
}

storeMyemailid(emailid:any){
  sessionStorage.setItem("emailid",emailid);
}

getMyemailid(){
  return sessionStorage.getItem("emailid");
}

storecalory(calory:any){
  sessionStorage.setItem("calory",calory)
}

getcalory(){
  return sessionStorage.getItem("calory");
}
}

