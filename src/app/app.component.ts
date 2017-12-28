import { Component,  Inject, Output, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { CoreService } from './shared/services/core.service';
import { LocationService } from './shared/services/location.service';
import { RecaptchaLoaderService } from 'ng-recaptcha';
import { SettingsService } from './shared/services/settings.service';
import { TranslateService } from '@ngx-translate/core';
import { DefaultLangChangeEvent } from '@ngx-translate/core';
import { MatSidenav } from '@angular/material';
import { ScrollTrackerEventData } from '@nicky-lenaers/ngx-scroll-tracker';
import { BehaviorSubject } from 'rxjs';
import { routerTransition } from './animations/router-transition';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    animations: [routerTransition]
})
export class AppComponent {

    @ViewChild('sidenav') sidenav: MatSidenav ;
    title: BehaviorSubject<string> = new BehaviorSubject('title.app');
    scrollPosition: number = 0;
    scrollableElement = null;
    offSet: number = 240;

    constructor(
        private translate: TranslateService,
        public auth: AuthService,
        public coreSrv: CoreService,
        private settingsService: SettingsService,
        private location: LocationService
    ){
        // Setting default lang that will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('es');

        this.settingsService.loadSettings.subscribe((settings) => {

            this.coreSrv.darkTheme.next(settings.isDark);
            this.coreSrv.language.next(settings.language);
            this.title = this.coreSrv.title;
        });

        location.getCurrentLocation();
    }

    scrollHandler(eventData: ScrollTrackerEventData) {
        let win = eventData.$event.srcElement ? eventData.$event.srcElement.scrollTop : 0;
        let scroll = win;

        if (scroll > this.scrollPosition && this.scrollPosition > this.offSet) {

            this.coreSrv.isScrolling.next('down');
        } else {
            this.coreSrv.isScrolling.next('up');
            if (eventData.$event.srcElement) {
                this.scrollableElement = eventData.$event.srcElement;
            }
        }
        this.scrollPosition = scroll;
    }

    public getRouterOutletState(outlet) {

        return outlet.isActivated ? outlet.activatedRoute : '';
    }
}
