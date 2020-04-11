import { UserService } from './../../../core/user/user.service';
import { Directive, OnInit, Renderer, ElementRef } from "@angular/core";
import { Photo } from "../../photo/photo";
import { Input } from "@angular/core";

@Directive({
    selector :'[photoOwnerOnly]'
})
export class PhotoOwnerOnlyDirective implements OnInit {
    
    @Input() ownedPhoto: Photo;

    constructor(
        private element: ElementRef<any>,
        private renderer: Renderer,
        private userService: UserService
    ) {}

    ngOnInit() : void {
        this.userService
            .getUser()
            .subscribe(user => {
                 if(!user || user.id != this.ownedPhoto.userId) 
                    this.renderer.setElementStyle(this.element.nativeElement, 'display', 'none'); //Hide an element from the DOM
            });
    }
}
