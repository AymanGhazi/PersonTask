import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbDatepicker, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './footer/footer.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule } from '@angular/material/paginator';
import {MatSortModule } from '@angular/material/sort';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { ConfirmationModalComponent } from './Modals/confirmation-modal/confirmation-modal.component';
import { PersonFormModalComponent } from './Modals/person-form-modal/person-form-modal.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NewPersonModalComponent } from './Modals/new-person-modal/new-person-modal.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    ConfirmationModalComponent,
    PersonFormModalComponent,
    NewPersonModalComponent,
    
  ]
    ,
  imports: [
  CommonModule,
  RouterModule, 
  NgbModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatDialogModule,
  ReactiveFormsModule,
  MatInputModule,
  MatSelectModule,
  MatCheckboxModule,
  MatRadioModule,
  ModalModule,
  FormsModule,
  MatDatepickerModule,
  MatNativeDateModule,
  ],exports:[ 
  NavbarComponent,
  FooterComponent,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatDialogModule,
  ReactiveFormsModule,
  MatInputModule,
  MatSelectModule,
  MatCheckboxModule,
  MatRadioModule,
  FormsModule,
  MatDatepickerModule,
  MatNativeDateModule,
  NgbDatepicker

  ]
})
export class SharedModule { }
