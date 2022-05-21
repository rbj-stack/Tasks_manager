import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DisplayTaskComponent } from './pages/display-task/display-task.component';
import { CommonModule } from '@angular/common';
import { WebreqinterceptorService } from './webreqinterceptor.service';

// add import httpclient
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NewDayComponent } from './pages/new-day/new-day.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterComponent } from './pages/register/register.component';
import { WebrequestService } from './webrequest.service';
import { EditDayComponent } from './pages/edit-day/edit-day.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';

@NgModule({
  declarations: [
    AppComponent,
    DisplayTaskComponent,
    NewDayComponent,
    NewTaskComponent,
    LoginPageComponent,
    RegisterComponent,
    EditDayComponent,
    EditTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:WebreqinterceptorService,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
