import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { PersonService } from 'src/app/Services/person-service.service';
import { Person } from "../Models/person";

@Injectable({
    providedIn :'root'
})
export class PersonResolver implements Resolve<Person[]>{
  constructor(private PersonService:PersonService){
    }
    
    resolve(route: ActivatedRouteSnapshot):Observable<Person[]> {
     return this.PersonService.getAllPersons()
    }
      

}