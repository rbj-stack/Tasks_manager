import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(private authService :AuthServiceService, private router: Router) { }

  ngOnInit(): void {
  }
  onLogin(email:string,password:string){
    this.authService.login(email,password).subscribe((res:HttpResponse<any>)=>{
      this.router.navigate(['../']);
      console.log(res);
    })
    
    
  }
}
