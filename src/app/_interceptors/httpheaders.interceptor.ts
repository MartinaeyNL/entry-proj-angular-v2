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

  // Constructor
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const userToken = localStorage.getItem('userToken');
    console.log('[HttpHeaders] Adding the userToken: [' + this.userToken + ']');
    // console.log('[' + this.userToken + ']');
    if (userToken) {
      const cloned = request.clone({
        setHeaders: {
          Authorization: `Bearer ${userToken}`
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
