import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from './../../Services/account.service';
import { Person } from 'src/app/Models/person';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

 authForm: FormGroup=new FormGroup({});
  submitted = false;
  loading = false;
  error = "";
  hide = true;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private AccountService:AccountService,
    private toastr:ToastrService
   
  ) {
   
  }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      email: ["ayman@gmail.com", Validators.required],
      password: ["Pa$$w0rd", Validators.required],
    });
  }
  get f() {
    return this.authForm.controls;
  }
  UserSet() {
    this.authForm.get("email")?.setValue("ayman@gmail.com");
    this.authForm.get("password")?.setValue("Pa$$w0rd");
  }
  AdminSet() {
    this.authForm.get("email")?.setValue("admin@gmail.com");
    this.authForm.get("password")?.setValue("Pa$$w0rd");
  }
 
  onSubmit() {
    this.submitted = true;
    this.error = "";
    if (this.authForm.invalid) {
      this.error = "Email and Password not valid !";  
        return;
    }else{
    this.loading = true;
    this.AccountService.login(this.authForm.value).subscribe((response)=>{
          this.router.navigateByUrl("/dashboard")
          this.toastr.success("SccuessFull Login","Success",{positionClass:"toast-bottom-left"})
      })
    }
     
  
  }
}
