import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpcommunicationService {

  constructor(private httpClient: HttpClient) { }

  // Methods
  public getAuthenticator(email: string, password: string): Observable<any> {
    const httpSetup = this.httpClient.post<Observable<any>>('/auth/login', {email, password});
    return httpSetup;
  }
}
