import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';

@Component({
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  loginForm: FormGroup;
  @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>; //links to template element reference #userNameInput in signin.component.html

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private platformDetectorService: PlatformDetectorService) { }

  ngOnInit() {
    //two form-controls: userName and password; these names have to match the input formControlName directives on the template
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.platformDetectorService.isPlatformBrowser() &&
      this.userNameInput.nativeElement.focus(); //auto-focus to userName field
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
          this.platformDetectorService.isPlatformBrowser() &&
            this.userNameInput.nativeElement.focus();
        }
      );
  }

}
