import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';   //this is the import command of the jwt decoder
import { TokenService } from './../token/token.service';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<User>(null);

  constructor(private tokenService: TokenService) { 
    this.tokenService.hasToken() &&
      this.decodeAndNotify();
  }

  setToken(token) {
    this.tokenService.setToken(token);
    this.decodeAndNotify();
  }

  getUser() {
    return this.userSubject.asObservable();
  }

  private decodeAndNotify() {
    const token = this.tokenService.getToken();
    const user = jwt_decode(token) as User; //it calls jwt_decode to read the User information from the JWT Payload
    this.userSubject.next(user); //userSubject (type Subject) emits a User information
  }

  logout() {
    this.tokenService.removeToken();
    this.userSubject.next(null);
  }

}
