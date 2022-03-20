import { Component, OnInit } from '@angular/core';
import { Fav } from 'src/fav';
import { AuthenticationService } from 'src/server/authentication.service';
import { ProductserviceService } from 'src/server/productservice.service';
import { RouterService } from 'src/server/router.service';

import { Nutrition } from '../nutrition';



@Component({
  selector: 'app-userview',
  templateUrl: './userview.component.html',
  styleUrls: ['./userview.component.css']
})
export class UserviewComponent implements OnInit {
  proObj : Nutrition = new Nutrition();
  favobj:Fav=new Fav();
  NutritionArr:Array<Nutrition>=[];
  productArr : Array<Fav>=[];
  emailid:any;
  
  searchkey:string ="";
  // searchkey1:string ="";
    public searchTerm : string ='';
    public totalItem : number =0;
     searchTerm1 : string ='';


 
  constructor( private nutriobj : ProductserviceService, private routeserv : RouterService,private authserv:AuthenticationService) { }

  ngOnInit(): void {
    this.nutriobj.getProduct().subscribe(
      (res: any)=>
      {
        this.NutritionArr = res;
        console.log(res);
     
      });
      

      this.nutriobj.search.subscribe((val:any)=>{
        this.searchkey = val;
      })
  }
  search(event:any)
  {
       this.searchTerm = (event.target as HTMLInputElement).value;
     
       this.nutriobj.search.next(this.searchTerm);
  }

    searchcalory(cal:any)
    {
      
    
      this.nutriobj.getbycalory(cal).subscribe(
        (res:any)=>{
          this.NutritionArr=res;
          console.log(res);
        }
      )
    }
    
  calltofav()
  {
    this.routeserv.openfavorite();
  }
  
 
  
 
  
  addtofav(nutri:any){
    this.emailid= this.authserv.getMyemailid();
    this.favobj.emailid=this.emailid;
    this.favobj.productid=nutri.productid;
    this.favobj.favid=nutri.productid+this.emailid;
    this.favobj.name=nutri.name;
    this.favobj.calory=nutri.calory;
    this.favobj.carbs=nutri.carbs;
    this.favobj.fats=nutri.fats;
    this.favobj.glycel=nutri.glycel;
    this.favobj.protein=nutri.protein;
    this.favobj.image=nutri.image;
    this.nutriobj.addtofav(this.favobj).subscribe(
      (res: any)=>{
        if(res){
          console.log(res);
        alert("product added to fav");
        }
        else{
          alert("already added");
        }   
      },
      (err:any)=>alert(err.error)
      )
  
  }

  logout()
  {
    sessionStorage.clear();
    this.routeserv.openHome();
    }
  


}
