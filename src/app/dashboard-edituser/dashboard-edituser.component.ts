import { Component, OnInit } from '@angular/core';
import {UserstorageService} from '../_services/userstorage.service';
import {User} from '../_models/user';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-dashboard-edituser',
  templateUrl: './dashboard-edituser.component.html',
  styleUrls: ['./dashboard-edituser.component.scss']
})
export class DashboardEdituserComponent implements OnInit {

  // Variables
  drawerVisible: boolean;

  finalUser: User;
  editForm: FormGroup;




  // Constructor
  constructor(private formBuilder: FormBuilder, private userService: UserstorageService) {
    userService.drawerState.subscribe(state => {
      this.drawerVisible = state;
    });
    this.editForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      email: '',
      avatar: ''
    });
    this.finalUser = null;
    /*this.firstNameValue = 'naam1';
    this.lastNameValue = 'naam2';
    this.emailValue = 'naam3';
    this.avatarUrlValue = 'naam4';*/
  }

  closeDrawer(): void {
    this.userService.closeDrawer();
  }

  // Init
  ngOnInit(): void {
  }

}
