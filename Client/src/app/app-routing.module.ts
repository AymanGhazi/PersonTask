import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
    {path: '',component:LoginComponent,},
    { path:"register", component:RegisterComponent },
    {path:"dashboard",component:AdminLayoutComponent
    ,children:[
    { path: '', runGuardsAndResolvers:'always',
    canActivate:[AuthGuard] ,component: DashboardComponent}
             ]},
   { path:"**", component:NotFoundComponent },
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration:"enabled"})],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
