import { Component, OnInit } from '@angular/core';
import {Data} from '@angular/router';
import {UserstorageService} from '../_services/userstorage.service';
import {User} from '../_models/user';
import {catchError, first} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-dashboardtable',
  templateUrl: './dashboardtable.component.html',
  styleUrls: ['./dashboardtable.component.scss']
})
export class DashboardtableComponent implements OnInit {

  // Variables
  checked = false;            // Checkbox at the top when selecting everything
  loadingState = false;
  searchNameVisible = false;
  searchNameValue = '';
  indeterminate = false;
  pageSize = null;

  listOfCurrentData: Data[] = [];
  setOfCheckedIds = new Set<number>();

  totalUserAmount: number = null;

  constructor(private userService: UserstorageService) {
    this.pageSize = 8;
    this.userService.listOfUsers.subscribe(receivedArray => {
      // console.log('[DashboardTable] Updating data with:');
      this.loadingState = false;
      // console.log(receivedArray);
      this.listOfCurrentData = receivedArray;
      this.setOfCheckedIds = new Set<number>();
      this.checked = false;
      this.indeterminate = false;
    });
  }

  ngOnInit(): void {
    this.requestListOfUsers(0, this.pageSize);
  }

  requestListOfUsers(offset: number, limit: number): void {
    this.userService.requestListOfUsers(offset, limit)
      .pipe(first(), catchError(err => {
        return throwError(err);
      }))
      .subscribe(data => {
        this.totalUserAmount = data.total;
      });
  }

  // When USER presses ONE item
  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  // When USER presses the 'all' buttons which selects all of the current page
  onAllChecked(checked: boolean): void {
    this.listOfCurrentData.filter(({ disabled }) => !disabled).forEach(({ id }) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }

  // When the USER changes the page
  onPageChange(pageNr): void {
    console.log('Changing to page number: ' + pageNr);
    this.requestListOfUsers((pageNr - 1) * this.pageSize, this.pageSize);
  }

  // LOGIC method where the List gets edited.
  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedIds.add(id);
    } else {
      this.setOfCheckedIds.delete(id);
    }
  }

  // LOGIC method to refresh the data
  refreshCheckedStatus(): void {
    const listOfEnabledData = this.listOfCurrentData.filter(({ disabled }) => !disabled);
    this.checked = listOfEnabledData.every(({ id }) => this.setOfCheckedIds.has(id));
    this.indeterminate = listOfEnabledData.some(({ id }) => this.setOfCheckedIds.has(id)) && !this.checked;
  }

  deleteUsersRequest(): void {
    this.loadingState = true;
    this.userService.deleteListOfUsers(this.setOfCheckedIds);
  }

  search(): void {
    console.log('Searching!');
    // console.log('[Search] The size was: ' + this.listOfCurrentData.length);
    // this.listOfCurrentData = this.listOfUsers.filter((item: User) => {
    //  return item.firstName.toLowerCase().includes(this.searchNameValue.toLowerCase()) ||
    //    item.lastName.toLowerCase().includes(this.searchNameValue.toLowerCase());
    // });
    // console.log('[Search] Size is now: ' + this.listOfCurrentData.length);
  }

  openDrawer(user): void {
    this.userService.openDrawer(user);
  }
  openUserCreation(): void {
    this.userService.openUserCreation();
  }

}
