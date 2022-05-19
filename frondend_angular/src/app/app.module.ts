import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DisplayTaskComponent } from './pages/display-task/display-task.component';
import { CommonModule } from '@angular/common';


// add import httpclient
import { HttpClientModule } from '@angular/common/http';
import { NewDayComponent } from './pages/new-day/new-day.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';

@NgModule({
  declarations: [
    AppComponent,
    DisplayTaskComponent,
    NewDayComponent,
    NewTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
