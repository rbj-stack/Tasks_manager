import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject, throwError } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class WebreqinterceptorService implements HttpInterceptor{

  constructor(private authService :AuthServiceService) { }
  refreshingAccessToken:boolean;
  accessTokenRefreshed:Subject<any>=new Subject();
  intercept(request:HttpRequest<any>,next:HttpHandler):Observable<any>{

    request=this.addAuthHeader(request);
    //netx() 
    return next.handle(request).pipe(
      catchError((error : HttpErrorResponse)=>{
        console.log(error);
        return throwError(error);
        if(error.status===401){
          // not loged in 
          // refresh access token
          console.log("you are not loged in!")
          this.authService.logout();
        }
      })
    )
  }




  addAuthHeader(request:HttpRequest<any>){
    const token=this.authService.getAccessToken();
    if(token){
      return request.clone({
        setHeaders:{
          'x-access-token':token
        }
      })
    }
    return request;
  }
}
