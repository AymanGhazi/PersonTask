import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { AdminLayoutComponent } from './admin-layout.component';


export const AdminLayoutRoutes: Routes = [
{path:"dashboard",component:AdminLayoutComponent,children:
[
    { path: '' , component: DashboardComponent },
  
    ]}
];
@NgModule({
  imports: [RouterModule.forChild(AdminLayoutRoutes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutesModule { }
