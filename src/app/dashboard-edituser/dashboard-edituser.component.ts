import { Component, OnInit } from '@angular/core';
import {UserstorageService} from '../_services/userstorage.service';
import {User} from '../_models/user';
import {FormBuilder, FormGroup} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-dashboard-edituser',
  templateUrl: './dashboard-edituser.component.html',
  styleUrls: ['./dashboard-edituser.component.scss']
})
export class DashboardEdituserComponent implements OnInit {

  // Variables
  editingUser: User;
  submittingState: boolean;

  editForm: FormGroup;


  // Constructor
  constructor(private formBuilder: FormBuilder, private message: NzMessageService, private userService: UserstorageService) {
    this.submittingState = false;
    this.editingUser = null;
  }

  closeDrawer(): void {
    this.userService.closeDrawer();
  }

  submitForm(): void {
    const finalUser = this.editForm.value as User;
    this.userService.editUser(this.editingUser, finalUser);
  }

  // Init
  ngOnInit(): void {
    this.userService.editingUser.subscribe(user => {
      this.editingUser = user;
      this.editForm = this.formBuilder.group({
        firstName: this.editingUser?.firstName,
        lastName: this.editingUser?.lastName,
        email: this.editingUser?.email,
        avatar: this.editingUser?.avatar,
      });
    });
    this.userService.submittingState.subscribe(state => {
      if(this.submittingState === true && state === false) {
        this.message.create('success', 'Successfully saved the User!');
      }
      this.submittingState = state;
    });
  }

}
