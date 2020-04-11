import { UserService } from './../../core/user/user.service';
import { AlertService } from './../../shared/components/alert/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PhotoService } from './../photo/photo.service';
import { Photo } from '../photo/photo';
import { PhotoComment } from '../photo/photo-comment';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.css']
})
export class PhotoDetailsComponent implements OnInit {

  photo$: Observable<Photo>;
  photoId: number;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private photoService: PhotoService,
    private router: Router,
    private alertService: AlertService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.photoId = this.activatedRoute.snapshot.params.photoId;
    console.log("PhotoId: ", this.photoId);
    this.photo$ = this.photoService.findById(this.photoId);
  }

  remove() {
    this.photoService
      .removePhoto(this.photoId)
      .subscribe(
        () => {
                this.alertService.success("Photo removed !", true);
                this.router.navigate(['/user', this.userService.getUserName()]);
        },
        err => {
                console.log("Error when removing the photo: ", err);
                this.alertService.warning('Could not delete the photo !');
        });
  }

}
