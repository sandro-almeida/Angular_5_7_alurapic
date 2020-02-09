import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_URL = 'http://localhost:3000';

//providedIn: 'root': means that we will have a single instance for the whole application
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  authenticate(userName: string, password: string) {
    //post returns an Observable
    return this.httpClient.post(API_URL + '/user/login', {userName, password}); //same as {userName: userName, password: password}
  }
}
