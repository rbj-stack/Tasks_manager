import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/auth-service.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {



  constructor(private authService: AuthServiceService) { }

  ngOnInit() {
  }

  // onSignupButtonClicked(email: string, password: string) {
  //   this.authService.register(email, password).subscribe((res: HttpResponse<any>) => {
  //     console.log(res);
  //     // this.router.navigate(['/lists']);
  //   });
  // }

}

