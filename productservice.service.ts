import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject,tap} from 'rxjs';

import { AuthenticationService } from './authentication.service';
import { Nutrition } from '../app/nutrition';
import { User } from '../app/user';




@Injectable({
  providedIn: 'root'
})
export class ProductserviceService {
  Nutrition: Array<Nutrition> = [];
  Productsubject: BehaviorSubject<Array<Nutrition>>;
  public favorite : any =[]
public product = new BehaviorSubject<any>([]);

public search = new BehaviorSubject<string>("");
  
  
  constructor(private httpClient: HttpClient,private authserve:AuthenticationService) { 
    this.Productsubject=new BehaviorSubject<Array<Nutrition>>([]);
  }

  addCustomer(userobj : User) : Observable<User>
  {
    return this.httpClient.post<User>("http://localhost:9090/authentication/register",userobj);
  }

  
  getProduct():Observable <Array<Nutrition>>
{
  
  let mytoken= this.authserve.getMytoken()
  return this.httpClient.get<Array<Nutrition>>('http://localhost:9092/product/viewProduct',
  {
    headers : new HttpHeaders().set('Authorization',`Bearer ${mytoken}`)
  }).pipe(
    tap((addedprod:any)=>{
      this.Nutrition.push(addedprod);
      this.Productsubject.next(this.Nutrition);
    }))
}

addProduct(data: Nutrition): Observable<Nutrition> {
  let mytoken= this.authserve.getMytoken();
  return this.httpClient.post<Nutrition>('http://localhost:9092/product/addProduct',data,
        {
          headers : new HttpHeaders().set('Authorization',`Bearer ${mytoken}`)
        }).pipe(
          tap((addedprod:Nutrition)=>{
            this.Nutrition.push(addedprod);
            this.Productsubject.next(this.Nutrition);
          }))
 
}

deleteProduct(prodid: number) : Observable<any>
  {
    let mytoken=this.authserve.getMytoken();
    return this.httpClient.delete(`http://localhost:9092/product/delete/${prodid}`,
            {
              headers : new HttpHeaders().set('Authorization',`Bearer ${mytoken}`)
            }).pipe(
              tap((deletedprod:any)=>{
                this.Nutrition.push(deletedprod);
                this.Productsubject.next(this.Nutrition);
              })
            )
          }
   
// editProduct(prodid:any ): Observable<Nutrition> {
//   let mytoken=this.authserve.getMytoken();
//   return this.httpClient.put<Nutrition>(`http://localhost:9092/product/update/${prodid}`,
//             {
//               headers : new HttpHeaders().set('Authorization',`Bearer ${mytoken}`)
//             }
//             ).pipe
//             (
//               tap((unote : Nutrition)=>
//               {
//                 let existobj = this.Nutrition.find(prod=> prod.productid==unote.productid);
//                 Object.assign(existobj,unote);
//                 this.Productsubject.next(this.Nutrition);
//               })
//             )
//           }

        getbycalory(calory:any){
          let mytoken= this.authserve.getMytoken()
  return this.httpClient.get<Array<Nutrition>>(`http://localhost:9092/product/findbycalory/${calory}`,
  {
    headers : new HttpHeaders().set('Authorization',`Bearer ${mytoken}`)
  }).pipe(
    tap((addedprod:any)=>{
      this.Nutrition.push(addedprod);
      this.Productsubject.next(this.Nutrition);
    }))
        }

        getbyname(name:any){
          let mytoken= this.authserve.getMytoken()
  return this.httpClient.get<Array<Nutrition>>(`http://localhost:9092/product/findbyproductname/${name}`,
  {
    headers : new HttpHeaders().set('Authorization',`Bearer ${mytoken}`)
  }).pipe(
    tap((addedprod:any)=>{
      this.Nutrition.push(addedprod);
      this.Productsubject.next(this.Nutrition);
    }))
        }
        
//-----------------------------fav----------------------------------



  
  getFavorite(emailid:any):Observable <Array<Nutrition>>
  {
    let mytoken= this.authserve.getMytoken()
    return this.httpClient.get<Array<Nutrition>>(`http://localhost:9094/favorite/viewfav/${emailid}`,
  {
    headers : new HttpHeaders().set('Authorization',`Bearer ${mytoken}`)
  }).pipe(
    tap((addedprod:any)=>{
      this.Nutrition.push(addedprod);
      this.Productsubject.next(this.Nutrition);
    }))

   
  }

  
  addtofav(prod :any):Observable<Nutrition> 
  {
    let mytoken= this.authserve.getMytoken();
    return this.httpClient.post<Nutrition>('http://localhost:9094/favorite/addfav',prod,
        {
          headers : new HttpHeaders().set('Authorization',`Bearer ${mytoken}`)
        }).pipe(
          tap((addedprod:any)=>{
            this.Nutrition.push(addedprod);
            this.Productsubject.next(this.Nutrition);
          }))
    
   
  }
  removeFavorite(prodid: any):Observable<any>
  {
    let mytoken=this.authserve.getMytoken();
    return this.httpClient.delete(`http://localhost:9094/favorite/delete/${prodid}`,
            {
              headers : new HttpHeaders().set('Authorization',`Bearer ${mytoken}`)
            }).pipe(
              tap((deletedprod:any)=>{
                this.Nutrition.push(deletedprod);
                this.Productsubject.next(this.Nutrition);
              })
            )
    

  }
  
}


