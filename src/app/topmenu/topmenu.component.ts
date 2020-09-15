import { Component, OnInit } from '@angular/core';
import {CurrentuserService} from '../_services/currentuser.service';
import {User} from '../_models/user';
import {Router} from '@angular/router';
import {UserstorageService} from '../_services/userstorage.service';

@Component({
  selector: 'app-topmenu',
  templateUrl: './topmenu.component.html',
  styleUrls: ['./topmenu.component.scss']
})
export class TopmenuComponent implements OnInit {

  activeUser: User = null;

  constructor(private router: Router, private cUserService: CurrentuserService, private userService: UserstorageService) {
    cUserService.activeUser.subscribe(receivedUser => { this.activeUser = receivedUser; });
  }
  viewUserProfile(): void {
    this.userService.openDrawer(this.activeUser);
  }

  logout(): void {
    this.cUserService.doLogout();
  }

  ngOnInit(): void {
  }

}
