import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './../../shared/shared.module';
import { TimeagoModule } from 'ngx-timeago';
import { DataTablesModule } from 'angular-datatables';
import { DashboardComponent } from './../pages/dashboard/dashboard.component';


@NgModule({
  imports: [
  CommonModule,
    FormsModule,
    NgbModule,
    SharedModule,
    DataTablesModule,
    TimeagoModule.forRoot()
  ],
  declarations: [
    DashboardComponent,
  

  ]
})

export class AdminLayoutModule {}
