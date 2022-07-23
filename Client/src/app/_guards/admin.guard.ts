import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { AccountService } from '../Services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private AccountService :AccountService,
    private roastr:ToastrService){}

  canActivate(): Observable<boolean> {
  return this.AccountService.CurrentUser$.pipe(map(user=> {
  if (user.roles.includes("Admin") || user.roles.includes("Moderator"))
    {
      return true;
    }
    this.roastr.error("you can not enter this Area");
     return false;
  }))

  }
  
}
