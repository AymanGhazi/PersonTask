import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './footer/footer.component';
import { FeatherModule } from 'angular-feather';
import { Camera, Heart, Github,Edit,Trash2 } from 'angular-feather/icons';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { ConfirmationModalComponent } from './Modals/confirmation-modal/confirmation-modal.component';
import { PersonFormModalComponent } from './Modals/person-form-modal/person-form-modal.component';

const icons = {
  Camera,
  Heart,
  Github,
  Edit,
  Trash2
};

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    ConfirmationModalComponent,
    PersonFormModalComponent
  ]
    ,
  imports: [
CommonModule,
  RouterModule, 
  NgbModule,
  FeatherModule.pick(icons),
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatDialogModule,
  ReactiveFormsModule,
  MatInputModule,
  MatSelectModule
  
  
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
  MatSelectModule
  ]
})
export class SharedModule { }
