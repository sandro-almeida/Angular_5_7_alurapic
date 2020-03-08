import { Injectable } from '@angular/core';
import { SignUpService } from './signup.service';
import { AbstractControl } from '@angular/forms';
import { debounceTime, switchMap, map, first } from 'rxjs/operators';

@Injectable()
export class UserNotTakenValidatorService {

    constructor(private signUpService: SignUpService) {}

    checkUserNameTaken() {

        return (control: AbstractControl) => {
            return control
                .valueChanges  //instead of control.value; valueChanges returns an Observable
                .pipe(debounceTime(300))
                .pipe(switchMap(userName =>
                    this.signUpService.checkUserNameTaken(userName)
                ))
                .pipe(map(isTaken => isTaken ? { userNameTaken: true } : null)) //returns an object ({ userNameTaken: true }) or null; userNameTaken is what needs to be verified on signup.component.html
                .pipe(first());
        }
    }
}