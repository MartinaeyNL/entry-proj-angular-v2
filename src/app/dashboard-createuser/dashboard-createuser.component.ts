import { Component, OnInit } from '@angular/core';
import {UserstorageService} from '../_services/userstorage.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {User} from '../_models/user';

@Component({
  selector: 'app-dashboard-createuser',
  templateUrl: './dashboard-createuser.component.html',
  styleUrls: ['./dashboard-createuser.component.scss']
})
export class DashboardCreateuserComponent implements OnInit {

  // Variables
  isVisible: boolean;
  submittingState: boolean;

  createForm: FormGroup;


  handleCancel(): void {
    this.userService.closeUserCreation();
  }
  handleOk(): void {
    if (this.createForm.valid) {
      this.userService.createNewUser(this.createForm.value as User);
    }
  }

  constructor(private formBuilder: FormBuilder, private userService: UserstorageService) {
    this.isVisible = false;
  }

  ngOnInit(): void {
    this.userService.creatingUserState.subscribe(
      state => { this.isVisible = state; },
      error => {
        console.log('Big Error in CreateUser:');
        console.log(error);
      }
    );
    this.userService.submittingState.subscribe(
      state => { if (state === false) { this.userService.closeUserCreation(); }},
      () => {},
    );
    this.createForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      email: '',
      avatar: '',
    });
  }

}
