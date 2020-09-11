import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {User} from '../_models/user';
import {HttpClient} from '@angular/common/http';
import {HttpcommunicationService} from './httpcommunication.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Router} from '@angular/router';
import set = Reflect.set;
import {catchError, first, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CurrentuserService {

  // Subjects
  private activeUserSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  public activeUser: Observable<User>;


  // Constructor
  constructor(private httpService: HttpcommunicationService, private router: Router, private httpClient: HttpClient) {
    this.activeUser = this.activeUserSubject.asObservable();

    // Decode token from local storage if available
    if (localStorage.getItem('userToken') != null) {
      this.activeUserSubject.next(
        new JwtHelperService().decodeToken(localStorage.getItem('userToken'))
      );
    }
  }


  // Login Process
  /*public doLoginRequest(username: string, password: string): void {
    this.httpService.getAuthenticator(username, password).subscribe(
      receivedData => {
        try {
          // Save userToken to localstorage, and User in subject
          const userToken = JSON.stringify(receivedData.token).split('"').join((''));
          localStorage.setItem('userToken', userToken);
          this.activeUserSubject.next(new JwtHelperService().decodeToken(userToken) as User);
          this.router.navigate(['/dashboard']);
        }
        catch (error) {
          this.latestErrorSubject.next(error);
        }
      },
      error => {
        this.latestErrorSubject.next(error);
      }
    );
  }*/

  public doLoginRequest(email: string, password: string): Observable<any> {
    return this.httpClient.post<any>(`/auth/login`, {email, password})
      .pipe(first(receivedData => {
        const userToken = JSON.stringify(receivedData.token).split('"').join((''));
        localStorage.setItem('userToken', userToken);
        this.activeUserSubject.next(new JwtHelperService().decodeToken(userToken) as User);
        return receivedData;
      }));
  }

  public doLogout(): void {
    localStorage.removeItem('userToken');
    this.activeUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}
