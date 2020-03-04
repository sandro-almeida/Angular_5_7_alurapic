import { UserService } from './../user/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../user/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'ap-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user$: Observable<User>; //$ at the end of the variable to indicate it is an Observable

  constructor(userService: UserService) { 
    this.user$ = userService.getUser(); //it returns an Observable
  }

  ngOnInit() {
  }

}
