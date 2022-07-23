import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { ROUTES } from '../../sidebar/sidebar.component';
import { Router } from '@angular/router';
import { Location} from '@angular/common';
import { Person } from 'src/app/Models/person';
import { AccountService } from './../../Services/account.service';

@Component({
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit{
  currentUser!:Person
    constructor(private accountService:AccountService,private router:Router) {
    this.currentUser=JSON.parse(localStorage.getItem('user')||"null");
    }
    ngOnInit(){

    }
    logout(){
    this.accountService.logout()
    this.router.navigateByUrl("/")
    }
  
 



}
