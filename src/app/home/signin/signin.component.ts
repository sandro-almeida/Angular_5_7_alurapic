import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../../core/auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    //two form-controls: userName and password; these names have to match the input formControlName directives on the template
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    const userName = this.loginForm.get('userName').value;
    const password = this.loginForm.get('password').value;

    console.log('usuário ' + userName + ' vai se autenticar');

    this.authService
      .authenticate(userName, password)
      .subscribe(
        () => {
          console.log('usuário autenticado');
          this.router.navigate(['user', userName]); //equals to: this.router.navigateByUrl('user/' + userName)
        },
        err => {
          console.log(err);
          this.loginForm.reset();
        }
      );
  }

}
