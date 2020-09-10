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
  editingUser: User;

  finalUser: User;
  editForm: FormGroup;


  // Constructor
  constructor(private formBuilder: FormBuilder, private userService: UserstorageService) {
    this.editingUser = null;
    this.finalUser = null;
  }

  closeDrawer(): void {
    this.userService.closeDrawer();
  }

  submitForm(): void {
    console.log(this.editForm.value);
    this.finalUser = this.editForm.value as User;
    console.log(this.finalUser);
  }

  // Init
  ngOnInit(): void {
    console.log(this.userService);
    this.userService.editingUser.subscribe(user => {
      this.editingUser = user;
      this.editForm = this.formBuilder.group({
        firstName: this.editingUser?.firstName,
        lastName: this.editingUser?.lastName,
        email: this.editingUser?.email,
        avatar: this.editingUser?.avatar,
      });
    });
  }

}
