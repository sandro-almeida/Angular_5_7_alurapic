import { PlatformDetectorService } from './../../../core/platform-detector/platform-detector.service';
import { Directive, ElementRef, OnInit } from "@angular/core";

//selector is an attribute
@Directive({
    selector: '[immediateClick]'
})
export class ImmediateClickDirective implements OnInit {
    
    //constructor receives an element reference to access the element
    constructor(
        private element: ElementRef<any>,
        private platformDetectorService: PlatformDetectorService
    ) {}

    ngOnInit(): void {
        this.platformDetectorService.isPlatformBrowser() &&
          this.element.nativeElement.click(); //automatically produces a click on the html element that includes this attribute (immediateClick)
    }
}