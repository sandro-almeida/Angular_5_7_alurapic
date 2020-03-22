import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  commentForm: FormGroup;

  constructor(
    private photoService: PhotoService,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit() {
    this.comments$ = this.photoService.getComments(this.photoId);
    console.log('Photo comments: ', this.comments$);
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.maxLength(300)]
    });
  }

  salvarComentario() {
    console.log('Vou salvar o comentario');
    const comment = this.commentForm.get('comment').value as string;
    this.photoService.
      addComment(this.photoId, comment).
      subscribe(() => {
        this.commentForm.reset();
        console.log('Comentario adicionado com sucesso !');
      });
  }

}
