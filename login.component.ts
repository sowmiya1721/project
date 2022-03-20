import { Component, OnInit } from '@angular/core';
import { RouterService } from 'src/server/router.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private route:RouterService) { }

  ngOnInit(): void {
  }
  openuser(){
    this.route.openuserlogin();
  }
  openadmin(){
    this.route.openAdminlogin();
  }
  
}
