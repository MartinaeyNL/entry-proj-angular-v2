import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../_models/user';
import {HttpClient} from '@angular/common/http';
import {HttpcommunicationService} from './httpcommunication.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Router} from '@angular/router';
import set = Reflect.set;

@Injectable({
  providedIn: 'root'
})
export class CurrentuserService {

  // Subjects
  private activeUserSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  public activeUser: Observable<User>;

  private latestErrorSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public latestError: Observable<string>;

  // private activeTokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  // public activeToken: Observable<string>;



  // Constructor
  constructor(private httpService: HttpcommunicationService, private router: Router) {
    this.activeUser = this.activeUserSubject.asObservable();
    this.latestError = this.latestErrorSubject.asObservable();
    // this.activeToken = this.activeTokenSubject.asObservable();

    // Decode token from local storage if available
    if(localStorage.getItem('userToken') != null) {
      this.activeUserSubject.next(
        new JwtHelperService().decodeToken(localStorage.getItem('userToken'))
      );
    }
  }


  // Login Process
  public doLoginRequest(username, password): void {
    if (typeof username === 'string' && typeof password === 'string') {   // To prevent manual injection
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
            console.log('1: [' + error + ']');
            this.latestErrorSubject.next(error);
          }
        },
        error => {
          console.log('2: [' + error + ']');
          this.latestErrorSubject.next(error);
        }
      );

    }
  }

  public doLogout(): void {
    localStorage.removeItem('userToken');
    this.activeUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}
