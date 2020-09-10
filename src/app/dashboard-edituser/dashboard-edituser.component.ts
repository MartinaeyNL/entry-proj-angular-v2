import { Component, OnInit } from '@angular/core';
import {UserstorageService} from '../_services/userstorage.service';
import {User} from '../_models/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
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
  passwordVisible: boolean;
  activeMessage: any;

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
    if (this.editForm.valid) {
      const finalUser = this.editForm.value as User;
      this.userService.editUser(this.editingUser, finalUser);
    }
  }
  deleteUser(): void {
    const userSet = new Set<number>();
    userSet.add(this.editingUser.id);
    this.userService.deleteListOfUsers(userSet);
  }

  // Init
  ngOnInit(): void {
    this.userService.editingUser.subscribe(user => {
      this.editingUser = user;
      this.editForm = this.formBuilder.group({
        firstName: [this.editingUser?.firstName, [Validators.required]],
        lastName: [this.editingUser?.lastName, [Validators.required]],
        email: [this.editingUser?.email, [Validators.required]],
        avatar: this.editingUser?.avatar,
        password: [this.editingUser?.password, [Validators.minLength(4)]]
      });
    });
    this.userService.submittingState.subscribe(state => {
      if (this.submittingState === true && state === false && this.activeMessage == null) {
        const message = this.message.create('success', 'Successfully saved the User!');
        this.activeMessage = message;
        message.onClose.subscribe(
          () => { this.activeMessage = null; }
        );
      }
      this.submittingState = state;
    });
  }

}
