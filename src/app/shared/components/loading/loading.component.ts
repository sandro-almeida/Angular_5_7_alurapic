import { LoadingService } from './loading.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingType } from './loading-type';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ap-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  loading$: Observable<string>; //this was changed from LoadingType to string due to the map() change on ngOnInit()

  constructor(
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.loading$ = this.loadingService
      .getLoading()
      .pipe(map(loadingType => loadingType.valueOf())); //map() changes the returned Observable from a LoadingType enum to a string
  }

}
