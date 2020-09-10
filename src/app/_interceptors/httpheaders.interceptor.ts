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
    // console.log('[HttpHeaders] Adding the userToken: [' + userToken + ']');
    if (userToken) {
      const cloned = request.clone({
        setHeaders: {
          Authorization: `Bearer ${userToken}`
        }
      });
      return next.handle(cloned);
    }
    else {
      return next.handle(request);
    }
  }
}
