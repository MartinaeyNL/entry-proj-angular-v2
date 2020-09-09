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
    return this.httpClient.post<Observable<any>>('/auth/login', {email, password});
  }
  public getUserList(offset: number, limit: number): Observable<any> {
    return this.httpClient.get<Observable<any>>('/users?offset=' + offset + '&limit=' + limit);
  }
  public removeUserHttpDelete(userid: number): Observable<any> {
    return this.httpClient.delete<Observable<any>>('/users/' + userid);
  }
}
