import { ValidatorFn, FormGroup } from "@angular/forms";

export const userNamePassword: ValidatorFn = (formGroup: FormGroup) => {
    const userName = formGroup.get('userName').value;
    const password = formGroup.get('password').value;

    if(userName.trim() + password.trim()) {
        return userName != password 
        ? null //no error
        : { userNamePassword: true }; //this is the name of the property to be verified on the template
    } else {
        return null;
    }
};