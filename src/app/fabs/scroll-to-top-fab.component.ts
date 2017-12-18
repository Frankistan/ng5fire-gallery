import { Component, Input } from '@angular/core';
import { CoreService } from '../shared/services/core.service';

@Component({
    selector: 'fab-scroll-to-top',
    template: `
    <button [ngStyle]="{'display': (coreSrv.isScrolling|async)=='down' ? 'block':'none'}" mat-fab class="mat-fab-bottom-right" (click)="scrollToTop()">
        <mat-icon aria-label="subir imagen">arrow_upward</mat-icon>
    </button>
  `,
    styles: [`
        .mat-fab-bottom-right {
            top: auto !important;
            right: 1.5rem !important;
            bottom: 1.5rem !important;
            left: auto !important;
            position: fixed !important;
        }
    `]
})
export class FabScrollToTopComponent  {
    @Input() htmlElement;

    constructor(
        public coreSrv: CoreService,
    ) { }
    scrollToTop() {
        this.htmlElement.scroll({ top: 0, left: 0, behavior: 'smooth' });
    }

}
