import { Component, Input } from '@angular/core';
import { environment } from '../../../environments/environment'

const API = environment.apiUrl;
const CLOUD = API + '/imgs/';

@Component({
    selector: 'ap-photo',
    templateUrl: 'photo.component.html'
})
export class PhotoComponent {

    private _url: string = '';
    
    @Input() description='';
    
    //this inbound property can be set directly using obj.url = "123"
    @Input() set url(url: string) {
        if (!url.startsWith('data')) { //the url of all photos that come from http://localhost:3000/ start with 'data:image'
            this._url = CLOUD + url;
        } else {
            this._url = url;
        }
    }

    get url() {
        return this._url;
    }
}