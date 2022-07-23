import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { AccountService } from '../Services/account.service';
import { Person } from '../Models/person';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private account:AccountService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let  currentUser!:Person;

    this.account.CurrentUser$.pipe(take(1)).subscribe(user=>
      currentUser=user)
    //geting the token from the CurrentUser
     
if (currentUser) {
 request= request.clone(
   {
     setHeaders:{
       Authorization:`Bearer ${currentUser.token}`
     }
   }
  )
}
    return next.handle(request);
  }
}
