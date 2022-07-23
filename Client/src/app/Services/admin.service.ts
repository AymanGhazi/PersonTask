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
      return this.HttpClient.get<Person>(this.baseApi+'/api/admin/'+Id);
    }
  updatePerson(id:number,Person:Person,roles:string[]){
    
    return this.HttpClient.post(this.baseApi+'/api/admin/edit-Person/'+id+"?roles="+roles,Person)
    }
  remove(id:number) {
   return this.HttpClient.delete(this.baseApi+"/api/admin/"+id)
  }
   AddPerson(Person:any,roles:string[]){
    return this.HttpClient.post(this.baseApi+'/api/admin/add-person'+"?roles="+roles,Person)
    }

}