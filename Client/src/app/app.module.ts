import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
  import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { SidebarModule } from './sidebar/sidebar.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
  import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { AdminLayoutModule } from './layouts/admin-layout/admin-layout.module';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    
  ],
  imports: [
BrowserModule,
  AppRoutingModule,

AdminLayoutModule,
    BrowserAnimationsModule,
    SidebarModule,
   NgbModule,
   SharedModule,
   ToastrModule.forRoot(),
   AuthModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
