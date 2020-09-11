import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {User} from '../_models/user';
import {Data} from '@angular/router';
import {first} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class HttpcommunicationService {

  constructor(private httpClient: HttpClient) { }

  // Methods
  public getUserList(offset: number, limit: number): Observable<any> {
    return this.httpClient.get<Observable<any>>('/users?offset=' + offset + '&limit=' + limit);
  }
  public createUserHttp(user: User): Observable<any> {
    return this.httpClient.post<Observable<any>>('/users', user);
  }
  public editUserHttp(userId: number, user: User): Observable<any> {
    return this.httpClient.put<Observable<any>>('/users/' + userId, user);
  }
  public removeUserHttpDelete(userid: number): Observable<any> {
    return this.httpClient.delete<Observable<any>>('/users/' + userid);
  }
}
