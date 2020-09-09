import {Component, OnInit} from '@angular/core';
import {User} from './_models/user';
import {CurrentuserService} from './_services/currentuser.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'entryproj';
  activeUser: User = null;

  constructor(private userService: CurrentuserService) {
    userService.activeUser.subscribe(receivedUser => { this.activeUser = receivedUser; });
  }

  ngOnInit(): void {}
}
