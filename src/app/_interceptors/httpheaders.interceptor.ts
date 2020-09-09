import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpheadersInterceptor implements HttpInterceptor {

  // Variables
  userToken: string;

  // Constructor
  constructor() {
    this.userToken = localStorage.getItem('userToken');
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('[HttpHeaders] Adding the userToken:');
    console.log('[' + this.userToken + ']');
    if (this.userToken) {
      const cloned = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.userToken}`
        }
      });
      // console.log('[HttpHeaders] Cloned request is..');
      // console.log(cloned);
      return next.handle(cloned);
    }
    else {
      return next.handle(request);
    }
  }
}
