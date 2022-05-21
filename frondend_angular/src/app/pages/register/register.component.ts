import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/auth-service.service';
import { HttpResponse } from '@angular/common/http';
import { Router, RouteReuseStrategy } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {



  constructor(private authService: AuthServiceService,  private router: Router) { }

  ngOnInit() {
  }

  onSignup(email: String, password: String) {
    this.authService.register(email, password).subscribe((res: HttpResponse<any>) => {
      console.log(res);
      this.router.navigate(['/days']);
    });

       this.router.navigate(['../']);
  }


}

