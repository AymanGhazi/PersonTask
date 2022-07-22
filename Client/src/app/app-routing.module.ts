import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {  AdminLayoutRoutesModule } from './layouts/admin-layout/admin-layout.routing';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
    {path: '',component:LoginComponent,},
    { path:"register", component:RegisterComponent },
    { path:"**", component:NotFoundComponent },
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration:"enabled"}),
AdminLayoutRoutesModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
