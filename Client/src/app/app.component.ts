import { Component, OnInit } from '@angular/core';
import { Person } from './Models/person';
import { AccountService } from './Services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Client';

    constructor(private accountservice:AccountService,private router:Router){  }

  ngOnInit(): void {
      this.SetCurrentUser();

     }
   SetCurrentUser(){
    const userAsObj:Person=JSON.parse(localStorage.getItem('user')||"null")  
    if (userAsObj) {
    this.accountservice.setCurrentUser(userAsObj);
    this.router.navigateByUrl("/dashboard")
     }
  }

}
