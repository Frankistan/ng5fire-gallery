import { AvatarModule } from "ng2-avatar";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CustomCovalentModule } from './modules/custom-covalent.module';
import { CustomFirebaseModule } from './modules/custom-firebase.module';
import { CustomMaterialModule } from './modules/custom-material.module';
import { CustomRecaptchaModule } from './modules/custom-recaptcha.module';
import { CustomTranslationModule } from './modules/custom-translation.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { ImageCropperModule } from 'ng2-img-cropper';
import { LazyLoadImagesModule } from 'ngx-lazy-load-images';
import { MomentModule } from 'angular2-moment';
import { Ng2FilterPipeModule } from 'ng2-filter-pipe';
import { NgModule } from '@angular/core';
import { OrderModule } from 'ngx-order-pipe';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RoutingModule } from './modules/routing.module';
import { ScrollTrackerModule } from '@nicky-lenaers/ngx-scroll-tracker';

import { AppComponent } from './app.component';
import { EmptyGalleryComponent } from './gallery/empty-gallery/empty-gallery.component';
import { FabScrollToTopComponent } from './fabs/scroll-to-top-fab.component';
import { FabUploadImagesComponent } from './fabs/upload-images-fab.component';
import { ImageDetailComponent, DeleteImageDialog } from './gallery/image-detail/image-detail.component';
import { ImageElementComponent } from './gallery/image-list/image-element/image-element.component';
import { ImageListComponent } from './gallery/image-list/image-list.component';
import { ImageUploadComponent } from './gallery/image-upload/image-upload.component';
import { LoginComponent } from './auth/login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { SidenavListComponent } from './sidenav/sidenav-list/sidenav-list.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SortByBtnComponent } from './navbar/sort-by-btn/sort-by-btn.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ProfileEditorComponent, UploadAvatarDialog, DiscardChangesDialog } from './user/profile-editor/profile-editor.component';
import { ProfileInfoComponent } from './user/profile-info/profile-info.component';
import { SettingsComponent } from './settings/settings.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LangBtnComponent } from './navbar/lang-btn/lang-btn.component';

import { AuthService } from './shared/services/auth.service';
import { CoreService } from './shared/services/core.service';
import { ImageService } from './shared/services/image.service';
import { LocationService } from './shared/services/location.service';
import { SettingsService } from './shared/services/settings.service';
import { SnackbarService } from './shared/services/snackbar.service';
import { UploadImageService } from './shared/services/upload-image.service';
import { UserService } from './shared/services/user.service';

import { AuthGuard } from './guards/auth.guard';
import { ExitEditProfileGuard } from './guards/exit-edit-profile.guard';
import { LoggedInGuard } from './guards/logged-in.guard';

import { AutofocusDirective } from './shared/directives/autofocus.directive';



@NgModule({
    declarations: [
        AppComponent,
        AutofocusDirective,
        DeleteImageDialog,
        DiscardChangesDialog,
        EmptyGalleryComponent,
        FabScrollToTopComponent,
        FabUploadImagesComponent,
        ImageDetailComponent,
        ImageElementComponent,
        ImageListComponent,
        ImageUploadComponent,
        LangBtnComponent,
        LoginComponent,
        NavbarComponent,
        ProfileEditorComponent,
        ProfileInfoComponent,
        ResetPasswordComponent,
        SearchbarComponent,
        SettingsComponent,
        SidenavListComponent,
        SidenavListComponent,
        SignupComponent,
        SortByBtnComponent,
        SpinnerComponent,
        UploadAvatarDialog,
        WelcomeComponent
    ],
    imports: [
        AvatarModule,
        BrowserAnimationsModule,
        BrowserModule,
        CustomCovalentModule,
        CustomFirebaseModule,
        CustomMaterialModule,
        CustomRecaptchaModule,
        CustomTranslationModule,
        FlexLayoutModule,
        FormsModule,
        HttpClientModule,
        ImageCropperModule,
        LazyLoadImagesModule,
        MomentModule,
        Ng2FilterPipeModule,
        OrderModule,
        ReactiveFormsModule,
        RoutingModule,
        ScrollTrackerModule.forRoot(),
    ],
    entryComponents: [
        DeleteImageDialog,
        DiscardChangesDialog,
        UploadAvatarDialog,
    ],
    providers: [
        AuthGuard,
        AuthService,
        CoreService,
        ExitEditProfileGuard,
        ImageService,
        LocationService,
        LoggedInGuard,
        SettingsService,
        SnackbarService,
        UploadImageService,
        UserService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
