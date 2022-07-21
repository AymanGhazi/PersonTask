import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
   
  ) {
   
  }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      username: ["admin@hospital.org", Validators.required],
      password: ["admin@123", Validators.required],
    });
  }
  get f() {
    return this.authForm.controls;
  }
  adminSet() {
    this.authForm.get("username")?.setValue("admin@hospital.org");
    this.authForm.get("password")?.setValue("admin@123");
  }
  doctorSet() {
    this.authForm.get("username")?.setValue("doctor@hospital.org");
    this.authForm.get("password")?.setValue("doctor@123");
  }
  patientSet() {
    this.authForm.get("username")?.setValue("patient@hospital.org");
    this.authForm.get("password")?.setValue("patient@123");
  }
  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.error = "";
    if (this.authForm.invalid) {
      this.error = "Username and Password not valid !";
      return;
    }
  }
}
