import { Component } from '@angular/core';
import { CoreService } from '../shared/services/core.service';

@Component({
    selector: 'spinner',
    template: `
        <div *ngIf="display" class="spinner" fxLayout="row" fxLayoutAlign="center center" fxFlexFill>
            <mat-spinner [strokeWidth]="3" [diameter]="50"></mat-spinner>
        </div>
        `,
    styles: [`
        .spinner{
            margin-top: 4rem !important;
        }
    `]
})
export class SpinnerComponent {

    display: boolean = false;

    constructor(private coreSrv: CoreService) {
        coreSrv.isLoading.subscribe(isLoading => this.display = isLoading);
    }

}
