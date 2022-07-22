import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, share, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Person } from '../Models/person';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
baseApi=environment.baseApi
user!:Person

  constructor(private HttpClient:HttpClient,private accountService:AccountService) { 
       this.accountService.CurrentUser$.pipe(take(1)).subscribe(user=>
      this.user=user)
  }
 
  getPersonWithRoles(Id:number){
      return this.HttpClient.get<Person>(this.baseApi+'/api/Admin/'+Id);
    }
  updatePerson(id:number,Person:Person,roles:string[]){
    
    return this.HttpClient.post(this.baseApi+'/api/Admin/edit-Person/'+id+"?roles="+roles,Person,{responseType: 'text'})
    }
  remove(id:number) {
   return this.HttpClient.delete(this.baseApi+"/api/Admin/"+id)
  }
   AddPerson(Person:any){
    return this.HttpClient.post(this.baseApi+'/api/Admin/add-person',Person).pipe(share())
    }

}