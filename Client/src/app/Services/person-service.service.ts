import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Person } from '../Models/person';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
 baseApi=environment.baseApi;
  constructor(private HttpClient:HttpClient) {}

  getAllPersons() {
  return this.HttpClient.get<Person[]>(this.baseApi+"/api/Person/GetPersons")
  }

 
  
  getPersonById(peronId:number){
    return this.HttpClient.get(this.baseApi+"/api/Person/"+peronId)
  }




}
