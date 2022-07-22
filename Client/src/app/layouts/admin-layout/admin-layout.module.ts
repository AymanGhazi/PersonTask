import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardComponent }       from '../../pages/dashboard/dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
  import { SharedModule } from './../../shared/shared.module';
import { AdminLayoutRoutes, AdminLayoutRoutesModule } from './admin-layout.routing';
import { TimeagoModule } from 'ngx-timeago';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule,
    SharedModule,
    AdminLayoutRoutesModule,
    DataTablesModule,
    TimeagoModule.forRoot()
  ],
  declarations: [
    DashboardComponent,
  

  ]
})

export class AdminLayoutModule {}
