import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';
import {CurrentuserService} from '../_services/currentuser.service';

@Injectable()
export class HttperrorInterceptor implements HttpInterceptor {


  // Constructor
  constructor(private router: Router, private userService: CurrentuserService) {}

  // Interceptor
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {

        console.log(error);

        // Cannot connect to server
        if (error.status === 0) {
          console.log('Couldn\'t connect to server.');
          return throwError('Couldn\'t connect to server.')
        }

        // Unauthorized
        if (error.status === 401) {
          console.log('Invalid Credentials.'); // temp
          if (this.router.url !== '/login') {
            this.userService.doLogout();
          }
          return throwError('Invalid Credentials.');
        }
        // else if(error.type)
        return throwError(error);
      })
    );
  }
}
