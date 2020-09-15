import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CurrentuserService} from '../_services/currentuser.service';
import {catchError, first} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {Router} from '@angular/router';

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
      this.userService.doLoginRequest(this.validateForm.get('userName').value, this.validateForm.get('password').value)
        .pipe(first(), catchError(err => {
          if (err.status === 401) {
            this.errorDisplay = err.error.error;
            this.validateForm.controls[`password`].reset();
          }
          return throwError(err);
        }))
        .subscribe(receivedData => {
          console.log(receivedData);
          this.router.navigate(['/dashboard']);
        });
    } else {
      this.errorDisplay = 'You haven\'t put the details in correctly.';   // Little bad practice
    }
  }

  // Constructor
  constructor(private fb: FormBuilder, private router: Router, private userService: CurrentuserService) {}

  // On Init
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

}
