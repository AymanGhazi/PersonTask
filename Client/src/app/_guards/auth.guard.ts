import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, map } from 'rxjs';
import { AccountService } from '../Services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private accountService:AccountService,
    private toastr:ToastrService,
    private router:Router
    ){}

  canActivate(): Observable<boolean> {
    
    return this.accountService.CurrentUser$.pipe(
      map(user=>{
        if(user)
        {
          return true;
        }
        else {
      this.router.navigateByUrl("/")
       this.toastr.error("you shall not pass!")
       return false
      }
    })
    );
  }
  
}
