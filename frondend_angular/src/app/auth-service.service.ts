import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { WebrequestService } from './webrequest.service';
import { Route, Router } from '@angular/router';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { shareReplay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http:HttpClient,private webService:WebrequestService,private router:Router) { }

  login(email:string,password:string){
    
    return this.webService.login(email, password).pipe(
          shareReplay(),
          tap((res: HttpResponse<any>) => {
              this.setSession(res.body._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));
              console.log("Logged in!");
          })
    )

  }
  logout(){
    this.removeSession();
    this.router.navigate(['/login']);
  }


  getRefreshToken(){
    return localStorage.getItem('x-refresh-token')
  }
  getAccessToken(){
    return localStorage.getItem('x-access-item')
  }
  setAccessToken(accessToken:string){
    return localStorage.setItem('x-access-access-token',accessToken)
  }

  private setSession(userId: string, accessToken: string | any , refreshToken: string | any ){
      localStorage.setItem('user-id',userId);
      localStorage.setItem('access-token',accessToken);
      localStorage.setItem('refresh-token',refreshToken);
  }
  
  private removeSession(){
    localStorage.removeItem('user-id');
    localStorage.removeItem('access-token');
    localStorage.removeItem('refresh-token');
}


  register(email: String, password: String) {
    return this.webService.
    register(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        // the auth tokens will be in the header of this response
        this.setSession(res.body._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));
        console.log("Successfully signed up and now logged in!");
      })
    )
  }

}
