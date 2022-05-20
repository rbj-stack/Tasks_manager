import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { WebrequestService } from './webrequest.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }

  // register(email: string, password: string) {
  //   return this.webService.
  //   .register(email, password).pipe(
  //     shareReplay(),
  //     tap((res: HttpResponse<any>) => {
  //       // the auth tokens will be in the header of this response
  //       this.setSession(res.body._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));
  //       console.log("Successfully signed up and now logged in!");
  //     })
  //   )
  // }

}
