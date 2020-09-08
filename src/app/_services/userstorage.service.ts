import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UserstorageService {

  private listOfUsersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(null);
  public listOfUsers: Observable<User[]>;

  constructor() {
    this.listOfUsers = this.listOfUsersSubject.asObservable();
  }
}
