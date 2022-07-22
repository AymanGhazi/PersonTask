import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    SharedModule,
    RouterModule,
    ToastrModule
  ],exports:[
     MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule
  ]
})
export class AuthModule { }
