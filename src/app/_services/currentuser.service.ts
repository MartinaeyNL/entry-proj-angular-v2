import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../_models/user';
import {HttpClient} from '@angular/common/http';
import {HttpcommunicationService} from './httpcommunication.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CurrentuserService {

  // Subjects
  private activeUserSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  public activeUser: Observable<User>;

  private latestErrorSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public latestError: Observable<string>;

  // TEMPORARY
  private activeTokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public activeToken: Observable<string>;



  // Constructor
  constructor(private httpService: HttpcommunicationService, private router: Router) {
    this.activeUser = this.activeUserSubject.asObservable();
    this.latestError = this.latestErrorSubject.asObservable();
    this.activeToken = this.activeTokenSubject.asObservable();
  }


  // Login Process
  public doLoginRequest(username, password): void {
    if (typeof username === 'string' && typeof password === 'string') {   // To prevent manual injection
      this.httpService.getAuthenticator(username, password).subscribe(
        receivedData => {
          const userToken = JSON.stringify(receivedData.token).split('"').join((''));
          this.activeUserSubject.next(new JwtHelperService().decodeToken(userToken) as User);
          this.router.navigate(['/dashboard']);
          // onsole.log(jwt_decode(userToken));
          // this.activeTokenSubject.next(userToken);
        },
        error => {
          console.log('[doLogin] Error:');
          console.log(error);
          this.latestErrorSubject.next(error);
        },
        () => { }
      );

    }
  }
}
