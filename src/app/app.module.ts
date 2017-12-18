import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './shared/services/auth.service';
import { AutofocusDirective } from './shared/directives/autofocus.directive';
import { CoreService } from './shared/services/core.service';
import { CustomCovalentModule } from './modules/custom-covalent.module';
import { CustomFirebaseModule } from './modules/custom-firebase.module';
import { CustomMaterialModule } from './modules/custom-material.module';
import { CustomRecaptchaModule } from './modules/custom-recaptcha.module';
import { CustomTranslationModule } from './modules/custom-translation.module';
import { EmptyGalleryComponent } from './gallery/empty-gallery/empty-gallery.component';
import { FabScrollToTopComponent } from './fabs/scroll-to-top-fab.component';
import { FabUploadImagesComponent } from './fabs/upload-images-fab.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { ImageCropperModule } from 'ng2-img-cropper';
import { ImageDetailComponent, DeleteImageDialog } from './gallery/image-detail/image-detail.component';
import { ImageElementComponent } from './gallery/image-list/image-element/image-element.component';
import { ImageListComponent } from './gallery/image-list/image-list.component';
import { ImageService } from './shared/services/image.service';
import { ImageUploadComponent } from './gallery/image-upload/image-upload.component';
import { LazyLoadImagesModule } from 'ngx-lazy-load-images';
import { LocationService } from './shared/services/location.service';
import { LoggedInGuard } from './guards/logged-in.guard';
import { LoginComponent } from './auth/login/login.component';
import { MomentModule } from 'angular2-moment';
import { NavbarComponent } from './navbar/navbar.component';
import { Ng2FilterPipeModule } from 'ng2-filter-pipe';
import { OrderModule } from 'ngx-order-pipe';
import { ProfileComponent } from './profile/profile.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { RoutingModule } from './modules/routing.module';
import { ScrollTrackerModule } from '@nicky-lenaers/ngx-scroll-tracker';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { SettingsService } from './shared/services/settings.service';
import { SidenavHeaderComponent } from './sidenav/sidenav-header/sidenav-header.component';
import { SidenavListComponent } from './sidenav/sidenav-list/sidenav-list.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SnackbarService } from './shared/services/snackbar.service';
import { SortByBtnComponent } from './navbar/sort-by-btn/sort-by-btn.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { UploadImageService } from './shared/services/upload-image.service';
import { UserService } from './shared/services/user.service';
import { ProfileEditorComponent, UploadAvatarDialog } from './user/profile-editor/profile-editor.component';
import { ProfileInfoComponent } from './user/profile-info/profile-info.component';
import { SettingsComponent } from './settings/settings.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LangBtnComponent } from './navbar/lang-btn/lang-btn.component';

@NgModule({
    declarations: [
        AppComponent,
        AutofocusDirective,
        DeleteImageDialog,
        EmptyGalleryComponent,
        FabScrollToTopComponent,
        FabUploadImagesComponent,
        ImageDetailComponent,
        ImageElementComponent,
        ImageListComponent,
        ImageUploadComponent,
        LoginComponent,
        NavbarComponent,
        ProfileComponent,
        ProfileEditorComponent,
        ProfileInfoComponent,
        ResetPasswordComponent,
        SearchbarComponent,
        SettingsComponent,
        SidenavHeaderComponent,
        SidenavListComponent,
        SidenavListComponent,
        SignupComponent,
        SortByBtnComponent,
        SpinnerComponent,
        UploadAvatarDialog,
        WelcomeComponent,
        LangBtnComponent
    ],
    imports: [
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
        UploadAvatarDialog,
        DeleteImageDialog
    ],
    providers: [
        AuthGuard,
        AuthService,
        CoreService,
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
