import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PhotoService } from './../photo/photo.service';
import { Photo } from '../photo/photo';
import { PhotoComment } from '../photo/photo-comment';

@Component({
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.css']
})
export class PhotoDetailsComponent implements OnInit {

  photo$: Observable<Photo>;
  photoId: number;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private photoService: PhotoService
  ) { }

  ngOnInit() {
    this.photoId = this.activatedRoute.snapshot.params.photoId;
    console.log("PhotoId: ", this.photoId);
    this.photo$ = this.photoService.findById(this.photoId);
  }

}
