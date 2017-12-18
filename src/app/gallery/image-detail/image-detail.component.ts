import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';
import { Image } from '../../models/image';
import { ImageService } from '../../shared/services/image.service';
import { SnackbarService } from '../../shared/services/snackbar.service';

@Component({
    selector: 'app-image-detail',
    templateUrl: './image-detail.component.html',
    styleUrls: ['./image-detail.component.css']
})
export class ImageDetailComponent implements OnInit {

    image$: Observable<Image>;
    image: Image;
    subscription: Subscription;
    imgSubscription: Subscription;
    delSubscription: Subscription;

    constructor(
        private dialog: MatDialog,
        private route: ActivatedRoute,
        private imgSrv: ImageService,
        public translate: TranslateService,
        private snackBar: SnackbarService,
        private router: Router) {

        moment.locale(translate.currentLang);

        // cambia el idioma de TIMEAGO cuando cambia el idioma de la App
        // FUNCIONA CON this.lastUpdated = new Date();
        this.subscription = this.translate.onLangChange.map(event => { return event.lang; }).subscribe((language) => {
            moment.locale(language);
        });
    }

    ngOnInit() {
        let id = this.route.snapshot.params['id'];
        this.image$ = this.imgSrv.read(id);
        this.imgSubscription = this.imgSrv.read(id).subscribe(image => {
            this.image = image;
        });
    }

    openDialog(): void {
        let dialogRef = this.dialog.open(DeleteImageDialog, {
            // width: '250px',
            data: { image: this.image }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.deleteImage(result);
            }
        });
    }

    toogleFav(image) {
        image.liked = !image.liked;
        this.imgSrv.update(image)
            .then(success => {
                if (image.liked) { this.snackBar.open('toast.image.liked', 'toast.close', 1500); }
                else { this.snackBar.open('toast.image.not_liked', 'toast.close', 1500); }
            })
            .catch(error => { this.snackBar.open('toast.serverResponse.' + error.message, 'toast.close'); });
    }

    private deleteImage(image) {
        this.delSubscription = this.imgSrv.delete(image)
            .subscribe(
            success => {
                this.snackBar.open('toast.image.deleted', 'toast.close');
                this.router.navigate(['/images']);
            },
            error => { this.snackBar.open('toast.serverResponse.' + error.code, 'toast.close'); }
            );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.imgSubscription.unsubscribe();
        if (this.delSubscription) this.delSubscription.unsubscribe();
    }

}

@Component({
    selector: 'delete-image-dialog',
    template: `
            <div fxLayout="column">
                <h2 mat-dialog-title> {{ 'dialog.delete_image.title' | translate }} </h2>
                <mat-dialog-content>
                    <div class="warning-toolbar">
                        <div class="warning-dialog-toolbar">
                            <mat-icon class="icon-half-padding">warning</mat-icon>
                            {{ 'dialog.delete_image.subtitle' | translate }}
                        </div>
                    </div>

                    <p> Imagen: </p>
                    <p>
                        {{ data.image.name }}
                    </p>
                </mat-dialog-content>
                <mat-dialog-actions align="end">
                    <button mat-raised-button (click)="onNoClick()" tabindex="-1" color="warn">{{ 'dialog.action.cancel' | translate }} </button>
                    <button mat-button [mat-dialog-close]="data.image" tabindex="2">{{ 'dialog.action.delete' | translate }} </button>
                </mat-dialog-actions>
            </div>
            `,
    styles: [`
        .warning-toolbar {
            background-color: #fbe9e7 !important;
            font-size: 14px;
            font-weight: 500;
            flex-direction: row;
        }

        .warning-toolbar .warning-dialog-toolbar {
            align-items: center;
            color: #d50000 !important;
            box-sizing: border-box;
            display: flex;
            height: auto !important;
            line-height: normal;
            padding: 0.5rem 0;
            white-space: inherit !important;
            width: 100%;
            word-wrap: break-word;
        }

        .icon-half-padding{
            padding: 0.5rem;
        }
    `]
})
export class DeleteImageDialog {

    constructor(
        public dialogRef: MatDialogRef<DeleteImageDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any) {

    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
