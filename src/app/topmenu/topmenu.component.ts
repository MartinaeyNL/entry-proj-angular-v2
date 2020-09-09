import { Component, OnInit } from '@angular/core';
import {CurrentuserService} from '../_services/currentuser.service';
import {User} from '../_models/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-topmenu',
  templateUrl: './topmenu.component.html',
  styleUrls: ['./topmenu.component.scss']
})
export class TopmenuComponent implements OnInit {

  activeUser: User = null;

  constructor(private router: Router, private userService: CurrentuserService) {
    userService.activeUser.subscribe(receivedUser => { this.activeUser = receivedUser; });
  }

  logout(): void {
    this.userService.doLogout();
  }

  ngOnInit(): void {
  }

}
