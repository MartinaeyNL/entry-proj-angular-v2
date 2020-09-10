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

  private editingUserSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  public editingUser: Observable<User>;

  private submittingStateSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public submittingState: Observable<boolean>;



  // Constructor
  constructor(private httpService: HttpcommunicationService) {
    this.listOfUsers = this.listOfUsersSubject.asObservable();
    this.totalUserAmount = this.totalUserAmountSubject.asObservable();
    this.editingUser = this.editingUserSubject.asObservable();
    this.submittingState = this.submittingStateSubject.asObservable();
  }

  openDrawer(user: User): void {
    this.editingUserSubject.next(user);
  }
  closeDrawer(): void {
    this.editingUserSubject.next(null);
  }

  // Getting list of users from API
  requestListOfUsers(offset: number, limit: number): void {
    this.httpService.getUserList(offset, limit).subscribe(
      receivedData => {
        console.log(receivedData);
        this.totalUserAmountSubject.next(receivedData.total);
        this.listOfUsersSubject.next(receivedData.data);
      },
      error => {
        console.log('[UserStorage] Oh jee... Een error:');
        console.log(error);
      }
    );
  }

  editUser(user: User, formData: User): void {
    this.submittingStateSubject.next(true);
    this.httpService.editUserHttp(user.id, formData).subscribe(
      () => {
        this.closeDrawer();
      },
      error => {
        console.log('Very big error in UserStorage:');
        console.log(error);
      },
      () => {
        this.submittingStateSubject.next(false);
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
