import { Component } from '@angular/core';
import { CoreService } from '../shared/services/core.service';

@Component({
    selector: 'fab-upload-images',
    template: `
    <button [ngStyle]="{'display': (coreSrv.isScrolling|async)=='up' ? 'block':'none'}"
        mat-fab class="mat-fab-bottom-right" routerLink="/upload">
        <mat-icon aria-label="subir imagen">add</mat-icon>
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
export class FabUploadImagesComponent {

    constructor(public coreSrv: CoreService) { }
}
