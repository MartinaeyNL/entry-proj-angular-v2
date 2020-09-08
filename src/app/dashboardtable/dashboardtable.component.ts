import { Component, OnInit } from '@angular/core';
import {Data} from '@angular/router';
import {UserstorageService} from '../_services/userstorage.service';
import {User} from '../_models/user';

@Component({
  selector: 'app-dashboardtable',
  templateUrl: './dashboardtable.component.html',
  styleUrls: ['./dashboardtable.component.scss']
})
export class DashboardtableComponent implements OnInit {

  // Variables
  checked = false;
  loadingState = false;
  searchNameVisible = false;
  searchNameValue = '';
  indeterminate = false;
  pageSize = null;

  listOfCurrentData: Data[] = [];
  listOfCurrentPageData: Data[] = [];
  setOfCheckedIds = new Set<number>();

  totalUserAmount: number = null;

  constructor(private userService: UserstorageService) {
    this.pageSize = 7;
    this.totalUserAmount = 0;
    this.userService.listOfUsers.subscribe(receivedArray => {
      console.log('[DashboardTable] Updating data!');
      this.listOfCurrentData = receivedArray;
    });
    this.userService.totalUserAmount.subscribe(receivedAmount => {
      this.totalUserAmount = receivedAmount;
    });
  }

  ngOnInit(): void {
    this.userService.requestListOfUsers(0, 7);
  }

  // When USER presses ONE item
  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  // When USER presses the 'all' buttons which selects all of the current page
  onAllChecked(checked: boolean): void {
    this.listOfCurrentPageData.filter(({ disabled }) => !disabled).forEach(({ id }) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }

  // When the USER changes the page
  onPageChange(pageNr): void {
    console.log('Changing to page number: ' + pageNr);
    this.userService.requestListOfUsers((pageNr - 1) * this.pageSize, this.pageSize);
  }
  onCurrentPageDataChange(listOfCurrentPageData: Data[]): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
    this.refreshCheckedStatus();
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
    const listOfEnabledData = this.listOfCurrentPageData.filter(({ disabled }) => !disabled);
    this.checked = listOfEnabledData.every(({ id }) => this.setOfCheckedIds.has(id));
    this.indeterminate = listOfEnabledData.some(({ id }) => this.setOfCheckedIds.has(id)) && !this.checked;
  }

  deleteUsersRequest(): void {
    this.loadingState = true;
    // const requestData = this.listOfUsers.filter(data => this.setOfCheckedIds.has(data.id));
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

}
