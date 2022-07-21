import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { NgModule } from '@angular/core';
import { AdminLayoutComponent } from './admin-layout.component';


export const AdminLayoutRoutes: Routes = [
{path:"dashboard",component:AdminLayoutComponent,children:
[
    { path: '' , component: DashboardComponent },
    { path: 'profile', component: UserComponent },
    { path: 'table',   component: TableComponent },
    { path: 'typography', component: TypographyComponent },
    { path: 'icons', component: IconsComponent },
    ]}
];
@NgModule({
  imports: [RouterModule.forChild(AdminLayoutRoutes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutesModule { }
