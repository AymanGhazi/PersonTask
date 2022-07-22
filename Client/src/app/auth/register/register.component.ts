import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    private route: ActivatedRoute,
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
      cpassword: ['', Validators.required],
      PhoneNumber: ['', Validators.required],
      Gender: ['Male', Validators.required],
      city: [''],
      country: [''],
      street: [''],
    });
  }
 
  onSubmit() {
    this.submitted = true;
     this.accountService.register(this.authForm.value).subscribe(response=>{
      this.Toastr.success("Account has been created","Success",{positionClass:"toast-bottom-left"})
      this.router.navigateByUrl("/dashboard",)
     })



  }

}
