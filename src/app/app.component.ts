import { Component,  Inject, Output } from '@angular/core';
import { ScrollTrackerEventData } from '@nicky-lenaers/ngx-scroll-tracker';
import { CoreService } from './shared/services/core.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './shared/services/auth.service';
import { DefaultLangChangeEvent } from '@ngx-translate/core';
import { SettingsService } from './shared/services/settings.service';
import { RecaptchaLoaderService } from 'ng-recaptcha';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    @Output() openedChange;
    title: BehaviorSubject<string> = new BehaviorSubject('title.app');
    scrollPosition: number = 0;
    scrollableElement = null;
    offSet: number = 240;

    constructor(
        private translate: TranslateService,
        public auth: AuthService,
        public coreSrv: CoreService,
        private settingsService: SettingsService,
    ){
        // Setting default lang that will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('es');

        this.settingsService.loadSettings.subscribe((settings) => {
            this.coreSrv.darkTheme.next(settings.isDark);
            this.coreSrv.language.next(settings.language);
            this.title = this.coreSrv.title;
        });
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

    hola() {
        // console.log('sidenav abierto');
    }
}
