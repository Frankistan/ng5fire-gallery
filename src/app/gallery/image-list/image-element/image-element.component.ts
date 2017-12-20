import { Component, Input, ViewChild, ElementRef, DoCheck} from '@angular/core';
import { fadeInAnimation } from '../../../animations/fade-in.animation';
// FUENTE: http://jasonwatmore.com/post/2017/04/19/angular-2-4-router-animation-tutorial-example

@Component({
    selector: 'app-image-element',
    templateUrl: './image-element.component.html',
    styleUrls: ['./image-element.component.css'],
    animations: [fadeInAnimation],
    host: { '[@fadeInAnimation]': '' }
})
export class ImageElementComponent implements  DoCheck {

    @Input() image;
    @ViewChild('myLazyImg') myLazyImg: ElementRef;

    constructor() {}

    ngDoCheck() {
        if (this.myLazyImg) {
            if (this.myLazyImg.nativeElement.classList.contains('ng-lazyloaded')) {
                this.myLazyImg.nativeElement.classList.remove("loading-image");
            }
        }
    }

}
