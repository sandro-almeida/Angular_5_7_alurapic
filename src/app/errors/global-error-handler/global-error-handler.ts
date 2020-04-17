import { ErrorHandler, Injectable, Injector } from "@angular/core";
import { Router } from '@angular/router';
import * as StackTrace from "stacktrace-js";
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { UserService } from 'src/app/core/user/user.service';
import { ServerLogService } from './server-log-service';
import { environment } from '../../../environments/environment';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler { 

    constructor(private injector: Injector) {}

    handleError(error: any): void {
        console.log('passei pelo handler');

        const location = this.injector.get(LocationStrategy); //dependency injection on demand
        const userService = this.injector.get(UserService);
        const serverLogService = this.injector.get(ServerLogService);
        const router = this.injector.get(Router);

        const url = location instanceof PathLocationStrategy //get the current route when error occurred
            ? location.path() : '';
        
        const message = error.message
            ? error.message : error.toString(); //message may not exist

        if(environment.production) { //navigate to error page only if it is a production environment
            router.navigate(['/error']);
        }

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
                serverLogService.log({ 
                    message, 
                    url, 
                    userName: userService.getUserName(), 
                    stack: stackAsString}
                ).subscribe(
                    () => console.log('Error logged successfully on server !'),
                    err => {
                        console.log(err);
                        console.log('Fail to send error log to server !');
                    }
                )
            });
    }
}
