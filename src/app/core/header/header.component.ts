import { UserService } from './../user/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../user/user';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'ap-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user$: Observable<User>; //$ at the end of the variable to indicate it is an Observable

  constructor(
    private userService: UserService, 
    private router: Router
  ) { 
    this.user$ = userService.getUser(); //it returns an Observable
  }

  ngOnInit() {
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['']); //navigates to login page
  }

}
