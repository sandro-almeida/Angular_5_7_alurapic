import { UserService } from './../../core/user/user.service';
import { AlertService } from './../../shared/components/alert/alert.service';
import { PhotoService } from './../photo/photo.service';
import { Photo } from './../photo/photo';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ap-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  photoForm: FormGroup;
  file: File;
  preview: string;

  constructor(
    private formBuilder: FormBuilder,
    private photoService: PhotoService,
    private router: Router,
    private alertService: AlertService,
    private userService: UserService
    ) { }

  ngOnInit() {
    //Each property listed in formBuilder.group() should match a form field
    this.photoForm = this.formBuilder.group({
      file: ['', Validators.required],
      description: ['', Validators.maxLength(300)],
      allowComments: [true]
    })
  }

  upload() {
    const description = this.photoForm.get('description').value;
    const allowComments = this.photoForm.get('allowComments').value;
    console.log("Descricao: ", description);
    console.log("Comentarios: ", allowComments);
    console.log("File: ", this.file);

    this.photoService.upload(description, allowComments, this.file)
      .subscribe(() => {
          this.alertService.success('Upload completed !', true);
          this.router.navigate(['/user', this.userService.getUserName()]);
        }
      );
  }

  handleFile(file: File) {
    this.file = file;
    //convert file to base 64
    const reader = new FileReader();
    reader.onload = (event: any) => this.preview = event.target.result;
    reader.readAsDataURL(file);
  }

}
