import { Component, OnInit, Inject, ViewChild, Renderer2, AfterContentInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';
import { LocationService } from '../../shared/services/location.service';
import { UploadImageService } from '../../shared/services/upload-image.service';
import { PasswordValidator } from '../../validators/match-password';
import { Subscription, Observable } from 'rxjs';
import { Upload } from '../../models/upload';
import { User } from '../../models/user';
import { scaleAnimation } from '../../animations/scale.animation';
import * as moment from 'moment';

@Component({
    selector: 'app-profile-editor',
    templateUrl: './profile-editor.component.html',
    styleUrls: ['./profile-editor.component.css'],
    animations: [scaleAnimation],
})
export class ProfileEditorComponent implements OnInit {
    private changed: boolean = false;
    private saved: boolean = false;
    address$: Observable<string>;
    hide: boolean = true;
    image: File = null;
    profileForm: FormGroup;
    showFields: boolean = false;
    subscription: Subscription;
    upload: Upload = null;
    userInfo: User;

    constructor(
        private dialog: MatDialog,
        private formBuilder: FormBuilder,
        private uploadImageSrv: UploadImageService,
        private userService: UserService,
        public auth: AuthService,
        public translate: TranslateService,
        private location: LocationService,
    ) {
        auth.user.subscribe((user) => {
            this.userInfo = user;
            if (user && user != undefined) {
                this.profileForm = this.formBuilder.group({
                    name: [this.userInfo.displayName, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
                    email: [{ value: this.userInfo.email, disabled: true }, [Validators.required, Validators.email]],
                    photoURL: [this.userInfo.photoURL, []],
                    password: ['', Validators.minLength(3)],
                    password_confirm: ['', Validators.minLength(3)]
                }, {
                        validator: PasswordValidator.MatchPassword // your validation method
                    });


            }
            let geo: any = user.location || {};
            this.address$ = location.getAddress(geo);
            this.profileForm.valueChanges.subscribe(val => {
                this.changed = true;
            });

        });



        moment.locale(translate.currentLang);

        // cambia el idioma de TIMEAGO cuando cambia el idioma de la App
        // FUNCIONA CON this.lastUpdated = new Date();
        this.subscription = this.translate.onLangChange.map(event => { return event.lang; }).subscribe((language) => {
            moment.locale(language);
        });
    }

    canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
        if (this.changed && !this.saved) {
            return this.opendDiscardDlg();
        } else {
            return true;
        }
    }

    ngOnInit() {
        // this.address$ = this.address$;
    }

    private opendDiscardDlg(): Observable<boolean> {
        let dialogRef = this.dialog.open(DiscardChangesDialog, {
            data: { answer: false }
        });

        return dialogRef.afterClosed().map(result => {
            if (!result) return false;
            return result.answer;
        });
    }

    togglePasswordFields() {
        this.showFields = !this.showFields;
    }

    updateProfile() {
        const inputValue = this.profileForm.value;

        const data: User = {
            uid: this.userInfo.uid,
            email: this.userInfo.email,
            displayName: inputValue.name,
            photoURL: inputValue.photoURL
        };

        this.userService.update(data, inputValue.password);
        this.saved = true;
    }

    uploadAvatar(image) {

        this.upload = new Upload(image);
        this.uploadImageSrv.uploadAvatar(this.upload, this.userInfo);
    }

    openUploadAvatarDlg(): void {
        let dialogRef = this.dialog.open(UploadAvatarDialog, {
            // width: '250px',
            data: { file: this.image }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result && result.file)
                this.uploadAvatar(result.file);
        });
    }

}

@Component({
    selector: 'upload-avatar-dialog',
    template: `
        <div >
            <h2 mat-dialog-title style="margin:0; "> {{ 'dialog.avatar.title' | translate }} </h2>
            <mat-dialog-content>
                <div>
                    <h3 style="margin: 1rem 0; ">
                        {{ 'dialog.avatar.subtitle' | translate }}
                            <input id="custom-input" type="file" (change)="fileChangeListener($event)">
                    </h3>
                    <img-cropper #cropper [image]="inputData" [settings]="cropperSettings"></img-cropper>
                    <br>
                    <span class="result rounded" *ngIf="inputData.image">
                        <img [src]="inputData.image" />
                    </span>
                </div>
            </mat-dialog-content>
            <mat-dialog-actions align="end">
                <button mat-raised-button (click)="onNoClick()" tabindex="-1" color="warn">{{ 'dialog.action.cancel' | translate }} </button>
                <button mat-button [mat-dialog-close]="data" tabindex="2">{{ 'dialog.action.upload' | translate }} </button>
            </mat-dialog-actions>
        </div>
            `,
})
export class UploadAvatarDialog implements OnInit, AfterContentInit {

    file: File = null;
    inputData: any = {};
    cropperSettings: CropperSettings;
    @ViewChild('cropper', undefined) cropper: ImageCropperComponent;

    constructor(
        private renderer: Renderer2,
        public dialogRef: MatDialogRef<UploadAvatarDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any) {

        this.loadCropperSettings();
    }

    ngOnInit() {
        // Pista: https://stackoverflow.com/questions/39876932/angular-2-image-uploader-with-cropper
        this.data.animal = "cats";
        this.data.name = "Frantxu";
        var that = this;
        this.cropper.onCrop.subscribe(event => {

            this.urltoFile(this.inputData.image, this.file.name, 'image/jpeg')
                .then(function (file) {
                    if (file) {
                        that.data.file = file;
                    }
                });
        });
    }

    private loadCropperSettings() {
        this.cropperSettings = new CropperSettings();
        this.cropperSettings.width = 200;
        this.cropperSettings.height = 200;
        this.cropperSettings.keepAspect = true;

        this.cropperSettings.croppedWidth = 200;
        this.cropperSettings.croppedHeight = 200;

        this.cropperSettings.canvasWidth = 300;
        this.cropperSettings.canvasHeight = 220;

        this.cropperSettings.minWidth = 100;
        this.cropperSettings.minHeight = 100;

        this.cropperSettings.rounded = true;
        this.cropperSettings.minWithRelativeToResolution = false;

        this.cropperSettings.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
        this.cropperSettings.cropperDrawSettings.strokeWidth = 2;
        this.cropperSettings.noFileInput = true;

    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    fileChangeListener($event) {
        var image: any = new Image();
        this.file = $event.target.files[0];

        var myReader: FileReader = new FileReader();
        var that = this;
        myReader.onloadend = function (loadEvent: any) {
            image.src = loadEvent.target.result;
            that.cropper.setImage(image);
        };

        myReader.readAsDataURL(this.file);
    }

    //return a promise that resolves with a File instance
    // FUENTE: https://stackoverflow.com/questions/16968945/convert-base64-png-data-to-javascript-file-objects
    private urltoFile(url, filename, mimeType) {
        mimeType = mimeType || (url.match(/^data:([^;]+);/) || '')[1];
        return (fetch(url)
            .then((res) => { return res.arrayBuffer(); })
            .then((buf) => { return new File([buf], filename, { type: mimeType }); })
        );
    }

    ngAfterContentInit() {
        //Called after ngOnInit when the component's or directive's content has been initialized.
        //Add 'implements AfterContentInit' to the class.
        let canvas = document.querySelector('canvas');
        let content = document.querySelector('mat-dialog-content');
        this.renderer.setAttribute(canvas, 'width', content.clientWidth - 8 + '');
        // this.renderer.setElementStyle(canvas, 'width', content.clientWidth - 48 + '');
        // this.renderer.setElementStyle(canvas,'width','100%');

        this.cropperSettings.canvasWidth = content.clientWidth - 8;
        canvas.width = content.clientWidth;
        // this.cropperSettings.canvasHeight = 400;
    }

}


@Component({
    selector: 'discard-changes-dialog',
    template: `
        <div >
            <h2 mat-dialog-title style="margin:0; "> {{ 'profile.discard' | translate }} </h2>
            <mat-dialog-actions align="end">
                <button mat-raised-button (click)="onNoClick()" tabindex="-1" color="warn">{{ 'dialog.action.cancel' | translate }} </button>
                <button mat-button [mat-dialog-close]="data" (click)="onConfirm()" tabindex="2" cdkFocusInitial>{{ 'dialog.action.confirm' | translate }} </button>
            </mat-dialog-actions>
        </div>
            `,
})
export class DiscardChangesDialog implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<DiscardChangesDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any) {

    }

    ngOnInit() {
    }

    onNoClick(): void {
        this.data.answer = true;
        this.dialogRef.close();
    }

    onConfirm() {
        this.data.answer = true;
    }

}

