import { PhotoComment } from './photo-comment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Photo } from "./photo";
import { map, catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';

const API = 'http://localhost:3000';

@Injectable({ providedIn: 'root' })
export class PhotoService {

    constructor(private http: HttpClient) {}

    listFromUser(userName: string) {
        return this.http
            .get<Photo[]>(API + '/' + userName + '/photos');       
    }

    listFromUserPaginated(userName: string, page: number) {
        const params = new HttpParams()
            .append('page', page.toString());

        return this.http
            .get<Photo[]>(API + '/' + userName + '/photos', { params });       
    }    

    upload(description: string, allowComments: boolean, file: File) {

        const formData = new FormData(); //Backend expects form data
        formData.append('description', description);
        formData.append('allowComments', allowComments ? 'true' : 'false');
        formData.append('imageFile', file);

        return this.http.post(API + '/photos/upload', formData);

    }

    findById(photoId: number) {
        return this.http.get<Photo>(API + '/photos/' + photoId);
    }

    getComments(photoId: number) {
        return this.http.get<PhotoComment[]>(
            API + '/photos/' + photoId + "/comments"
        );
    }

    addComment(photoId: number, commentText: string) {
        return this.http.post(
            API + '/photos/' + photoId + "/comments", { commentText } //commentText must be exactly the same text as expected at the backend
        );
    }

    removePhoto(photoId: number) {
        return this.http.delete(API + '/photos/' + photoId);
    }

    //Backend returns 201 status if all is good; and 304 if user has already liked the photo
    //This method should return an Observable true (if backend returns 201) or an Observable false (if backend returns 304); otherwise, then throw the error
    //http status 304 falls into Angular error range
    like(photoId: number) {
        return this.http.post(
            API + '/photos/' + photoId + '/like', {}, {observe: 'response'}
        )
        .pipe(map(res => true)) //transforms the response in an Observable true
        .pipe(catchError(err => {
            console.log('Request for like returned status code: ', err.status);
            return err.status == '304' ? of(false) : throwError(err);
        }));
    }

}
