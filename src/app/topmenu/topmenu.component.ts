import { Component, OnInit } from '@angular/core';
import {CurrentuserService} from '../_services/currentuser.service';
import {User} from '../_models/user';

@Component({
  selector: 'app-topmenu',
  templateUrl: './topmenu.component.html',
  styleUrls: ['./topmenu.component.scss']
})
export class TopmenuComponent implements OnInit {

  activeUser: User = null;

  constructor(private userService: CurrentuserService) {
    userService.activeUser.subscribe(receivedUser => { this.activeUser = receivedUser; });
  }

  ngOnInit(): void {
  }

}
