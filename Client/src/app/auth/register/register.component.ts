import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { AccountService } from './../../Services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  authForm!: FormGroup;
  submitted = false;
  hide = true;
  chide = true;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private accountService:AccountService,
    private Toastr:ToastrService
  ) {}
  ngOnInit() {
    this.authForm = this.formBuilder.group({
      userName: ['', Validators.required],
      email: [
        '',
        [Validators.required],
      ],
      password: ['', Validators.required],
      cpassword: [null,[Validators.required, this.matchValues('password')]],
      PhoneNumber: ['', Validators.required],
      Gender: ['Male', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['',Validators.required],
      country: ['',Validators.required],
      street: ['',Validators.required],
    });
     this.authForm.controls?.["password"].valueChanges.subscribe(()=>{
     this.authForm.controls?.["cpassword"].updateValueAndValidity();
   })
    
  }
   matchValues(matchto:string):ValidatorFn{
    return (control:AbstractControl|any)=>{
      return control?.value === control?.parent?.controls[matchto].value
      ? null:{isMatching:true}
    }
  }
 
  onSubmit() {
    this.submitted = true;
     this.accountService.register(this.authForm.value).subscribe(response=>{
      this.Toastr.success("Account has been created","Success",{positionClass:"toast-bottom-left"})
      this.router.navigateByUrl("/dashboard",)
     })



  }

}
