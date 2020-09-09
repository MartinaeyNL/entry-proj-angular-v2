import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../_models/user';
import {isInteger} from 'ng-zorro-antd';
import {HttpcommunicationService} from './httpcommunication.service';

@Injectable({
  providedIn: 'root'
})
export class UserstorageService {

  // Variables
  private listOfUsersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(null);
  public listOfUsers: Observable<User[]>;

  private totalUserAmountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  public totalUserAmount: Observable<number>;


  // Constructor
  constructor(private httpService: HttpcommunicationService) {
    this.listOfUsers = this.listOfUsersSubject.asObservable();
    this.totalUserAmount = this.totalUserAmountSubject.asObservable();
  }

  // Getting list of users from API
  requestListOfUsers(offset: number, limit: number): void {
    this.httpService.getUserList(offset, limit).subscribe(
      receivedData => {
        this.totalUserAmountSubject.next(receivedData.total);
        this.listOfUsersSubject.next(receivedData.data);
      },
      error => {
        console.log('[UserStorage] Oh jee... Een error:');
        console.log(error);
      }
    );
  }

  // Delete list of users
  deleteListOfUsers(checkedIds: Set<number>): void {
    const userList = this.listOfUsersSubject.getValue();
    const requestData = userList.filter(
      data => checkedIds.has(data.id));
    for (const user of requestData) {
      console.log('Deleting a user:');
      console.log(user);
      this.httpService.removeUserHttpDelete(user.id).subscribe(
        () => {
          // Copy the list without the deleted user, and submit to Subject.
          const tempList = userList.filter(item => {
            return user !== item;
          });
          this.listOfUsersSubject.next(tempList);
        }
      );
    }
  }
}
