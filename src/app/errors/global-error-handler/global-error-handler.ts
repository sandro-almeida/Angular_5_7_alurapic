import { ErrorHandler } from "@angular/core";
import * as StackTrace from "stacktrace-js";

export class GlobalErrorHandler implements ErrorHandler { 

    handleError(error: any): void {
        console.log('passei pelo handler')
        StackTrace
            .fromError(error)
            .then(stackFrames => {
                console.log('StackFrames: ', stackFrames);
                const stackAsString = stackFrames
                .map(sf => sf.toString())
                .join('\n');
                console.log('StackFrames as string: ', stackAsString);
            })
    }
}
