import { Component, OnInit } from '@angular/core';
import {UserstorageService} from '../_services/userstorage.service';

@Component({
  selector: 'app-dashboard-edituser',
  templateUrl: './dashboard-edituser.component.html',
  styleUrls: ['./dashboard-edituser.component.scss']
})
export class DashboardEdituserComponent implements OnInit {

  // Variables
  drawerVisible: boolean;

  // Constructor
  constructor(private userService: UserstorageService) {
    userService.drawerState.subscribe(state => {
      this.drawerVisible = state;
    });
  }

  closeDrawer(): void {
    this.userService.closeDrawer();
  }

  // Init
  ngOnInit(): void {
  }

}
