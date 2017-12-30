//our root app component
import { Component, NgModule, Injectable, Inject, NgZone } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { RecaptchaModule, RecaptchaLoaderService } from 'ng-recaptcha';

@Injectable()
export class RecaptchaDynamicLanguageLoaderService {
    public ready: Observable<any>;
    public language = '';
    private static ready: BehaviorSubject<any>;

    constructor() {
        this.init();
        this.ready = RecaptchaDynamicLanguageLoaderService.ready.asObservable();
    }

    public updateLanguage(newLang: string): void {
        this.language = newLang;
        console.log('hola: ', RecaptchaDynamicLanguageLoaderService.ready.getValue());

        RecaptchaDynamicLanguageLoaderService.ready.next(null);
        this.init();
        this.recaptchaScript();
    }

    private init() {
        if (RecaptchaDynamicLanguageLoaderService.ready) {
            if (RecaptchaDynamicLanguageLoaderService.ready.getValue()) {
                return;
            }
        } else {
            RecaptchaDynamicLanguageLoaderService.ready = new BehaviorSubject<any>(null);
            window.ng2recaptchaloaded = () => {
                RecaptchaDynamicLanguageLoaderService.ready.next(grecaptcha);
            };
        }
    }

    private recaptchaScript(){
        const script = document.createElement('script') as HTMLScriptElement;
        script.innerHTML = '';
        const langParam = this.language ? this.language : '';
        // script.src = `https://www.google.com/recaptcha/api.js?render=explicit&onload=ng2recaptchaloaded&hl=${langParam}`;
        script.src = `https://www.google.com/recaptcha/api.js?onload=ng2recaptchaloaded&render=explicit&hl=${langParam}`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
    }
}
