import { PhotoService } from './../../photo/photo.service';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { PhotoComment } from '../../photo/photo-comment';

@Component({
  selector: 'ap-photo-comments',
  templateUrl: './photo-comments.component.html',
  styleUrls: ['./photo-comments.component.css']
})
export class PhotoCommentsComponent implements OnInit {

  @Input() photoId: number;
  comments$: Observable<PhotoComment[]>;

  constructor(private photoService: PhotoService) { }

  ngOnInit() {
    this.comments$ = this.photoService.getComments(this.photoId);
    console.log('Photo comments: ', this.comments$);
  }

}
