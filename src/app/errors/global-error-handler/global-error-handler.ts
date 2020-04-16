import { ErrorHandler } from "@angular/core";

export class GlobalErrorHandler implements ErrorHandler { 

    handleError(error: any): void {
        console.log('Passei pelo Error Handler !');
        throw error;
    }
}
