import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayTaskComponent } from './pages/display-task/display-task.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NewDayComponent } from './pages/new-day/new-day.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { RegisterComponent } from './pages/register/register.component';




const routes: Routes = [
  { path:'' , redirectTo:'days' ,pathMatch:"full"} ,
  { path: 'new-day' , component: NewDayComponent},
  { path: 'days/:dayId/new-task' , component: NewTaskComponent},
  {path: 'days' , component:DisplayTaskComponent},
  {path: 'days/:dayId' , component:DisplayTaskComponent},
  { path: 'login' , component:LoginPageComponent},
  { path: 'register' , component:RegisterComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
