import { LoadingType } from './loading-type';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  loadingSubject = new Subject<LoadingType>();

  constructor() { }

  getLoading() {
    return this.loadingSubject
      .asObservable()
      .pipe(startWith(LoadingType.STOPPED)); //startWith to make LoadingType.STOPPED the firts emitted value
  }

  start() { //it will communicate with the component to display the progress bar
    this.loadingSubject.next(LoadingType.LOADING);
  }

  stop() { //it will communicate with the component to cease the progress bar exhibition
    this.loadingSubject.next(LoadingType.STOPPED);
  }

}
