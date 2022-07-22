import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Person } from 'src/app/Models/person';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
baseUrl=environment.baseApi;
private CurrentUserSource=new ReplaySubject<Person|any>(1);
CurrentUser$=this.CurrentUserSource.asObservable();

  constructor(private httClient:HttpClient) { }

  login(model:any){
    return this.httClient.post<Person>(this.baseUrl+"/api/Account/login",model).pipe(map((response:Person)=>{
      if (response) {
        this.setCurrentUser(response)
      }
    }))
  }

  register(model:any){
    return this.httClient.post<Person>(this.baseUrl+"/api/Account/register",model).pipe(map((response:Person)=>{
      if (response) {
      this.setCurrentUser(response)        
      }
    }))
  } 

  logout(){
    localStorage.removeItem('user')
    this.CurrentUserSource.next(null);
  }

  setCurrentUser(user:Person){
    user.roles=[];
    const roles=this.getDecodedToken(user.token).role;    
    Array.isArray(roles)? user.roles=roles : user.roles.push(roles);
    localStorage.setItem('user',JSON.stringify(user));
    this.CurrentUserSource.next(user);
  }
  getDecodedToken(Token:string){
    return JSON.parse(atob(Token.split('.')[1]))  }
}
