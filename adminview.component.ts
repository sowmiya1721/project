import { Component, OnInit } from '@angular/core';
import { RouterService } from 'src/server/router.service';
import { ProductserviceService } from 'src/server/productservice.service';
import { Nutrition } from '../nutrition';



@Component({
  selector: 'app-adminview',
  templateUrl: './adminview.component.html',
  styleUrls: ['./adminview.component.css']
})
export class AdminviewComponent implements OnInit {
  proObj : Nutrition = new Nutrition();
  productArr : Array<Nutrition>=[];
  

  
  
  constructor(private nutiser: ProductserviceService, private route:RouterService) {}

  ngOnInit(): void {
    this.nutiser.getProduct().subscribe(
      (res: any)=>
      {
        this.productArr = res;
        console.log(res);
     
      })

  }

 


  

  logout()
  {
    sessionStorage.clear();
    this.route.openHome();
    }

    delete(paramid :any)
    {
      let id : any;
      
      
      this.nutiser.deleteProduct(paramid).subscribe(
       (res:any)=>
       {
        id =this.productArr.findIndex( (emp:Nutrition)=>emp.productid==paramid);
        console.log(id);
       this.productArr.splice(id,1);
       
       } 
      )
      window.location.reload();
    }
    
    
      add(){
        this.route.openaddproduct();
      }
      
    }
 


