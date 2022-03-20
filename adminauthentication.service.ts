import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminauthenticationService {

  constructor(private httpClient:HttpClient) { }

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
}
