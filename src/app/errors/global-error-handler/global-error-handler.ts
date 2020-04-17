import { ErrorHandler, Injectable, Injector } from "@angular/core";
import * as StackTrace from "stacktrace-js";
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { UserService } from 'src/app/core/user/user.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler { 

    constructor(private injector: Injector) {}

    handleError(error: any): void {
        console.log('passei pelo handler');

        const location = this.injector.get(LocationStrategy); //dependency injection on demand
        const userService = this.injector.get(UserService);

        const url = location instanceof PathLocationStrategy //get the current route when error occurred
            ? location.path() : '';
        
        const message = error.message
            ? error.message : error.toString(); //message may not exist

        StackTrace
            .fromError(error)
            .then(stackFrames => {
                console.log('StackFrames: ', stackFrames);
                const stackAsString = stackFrames
                .map(sf => sf.toString())
                .join('\n');

                console.log('Error message: ', message);
                console.log('StackFrames as string: ', stackAsString);
                console.log('O que será enviado para o servidor: ');
                console.log({ message, url, userName: userService.getUserName(), stack: stackAsString});
            });
    }
}
