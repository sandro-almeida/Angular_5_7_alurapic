import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import { environment } from '../../../environments/environment'

const API = environment.apiUrl;

//providedIn: 'root': means that we will have a single instance for the whole application
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private userService: UserService
    ) { }

  authenticate(userName: string, password: string) {
    //post returns an Observable
    return this.httpClient.post(
      API + '/user/login', 
      {userName, password}, //same as {userName: userName, password: password}
      {observe: 'response'} //special configuration to allow access to the response object
      ) 
      .pipe(tap(res => { //thanks to the special configuration above, res is now an HttpResponse object
        const authToken = res.headers.get('x-access-token'); //response header set with the authentication token
        this.userService.setToken(authToken);
        console.log(`User ${userName} authenticated with token [${authToken}]`);
      }));
  }
}
