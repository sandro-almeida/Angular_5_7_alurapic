import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SignUpService } from './signup.service';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';
import { lowerCaseValidator } from 'src/app/shared/validators/lower-case.validator';
import { NewUser } from './new-user';
import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [ UserNotTakenValidatorService ]
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  @ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private userNotTakenValidatorService: UserNotTakenValidatorService,
    private signUpService: SignUpService,
    private router: Router,
    private platformDetectorService: PlatformDetectorService
    ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
        email: ['',
            [
                Validators.required,
                Validators.email
            ]
        ],
        fullName: ['',
            [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(40)
            ]
        ],
        userName: ['',
            [
                Validators.required,
                lowerCaseValidator,
                Validators.minLength(2),
                Validators.maxLength(30)
            ],
            this.userNotTakenValidatorService.checkUserNameTaken() //asynchronous validator as the third parameter
        ],
        password: ['',
            [
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(14)
            ]
        ]
    });

    this.platformDetectorService.isPlatformBrowser() &&
        this.emailInput.nativeElement.focus();  //auto-focus for email field
  }

  signup() {
      const newUser = this.signupForm.getRawValue() as NewUser; //this returns a JS object with all existing fields from the form
      this.signUpService
        .signup(newUser)
        .subscribe(
            () => {
                console.log('Usuario ' + newUser.userName + ' signed-up !!!');
                this.router.navigate(['']);
            },
            err => console.log(err)
        );
  }

}
