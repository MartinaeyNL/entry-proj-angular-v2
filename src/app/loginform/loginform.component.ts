import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CurrentuserService} from '../_services/currentuser.service';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.scss']
})
export class LoginformComponent implements OnInit {

  // Variables
  validateForm!: FormGroup;
  errorDisplay: string;

  // Methods
  submitForm(): void {

    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    // Check validation
    if (this.validateForm.valid) {
      this.userService.doLoginRequest(
        this.validateForm.get('userName').value as string,
        this.validateForm.get('password').value as string);
    } else {
      this.errorDisplay = 'You haven\'t put the details in correctly.';   // Little bad practice
    }
  }

  // Constructor
  constructor(private fb: FormBuilder, private userService: CurrentuserService) {
    this.userService.latestError.subscribe(receivedError => {
      console.log('Received Error on LoginForm!');
      console.log(receivedError);
      this.errorDisplay = receivedError;
      setTimeout(() => { this.errorDisplay = null; }, 5000);
    });
  }

  // On Init
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

}
