import { NgModule } from '@angular/core';
import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings, RecaptchaLoaderService, RECAPTCHA_LANGUAGE } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { environment } from './../../environments/environment';
// import { RecaptchaDynamicLanguageLoaderService } from '../shared/services/recaptcha-dynamic-language-loader.service';


@NgModule({
    imports: [
        RecaptchaModule.forRoot(),
        RecaptchaFormsModule
    ],
    exports: [
        RecaptchaModule,
        RecaptchaFormsModule
    ],
    providers: [
        {
            provide: RECAPTCHA_SETTINGS,
            useValue: { siteKey: environment.recaptcha.siteKey } as RecaptchaSettings,
        },
          {
              provide: RECAPTCHA_LANGUAGE,
              useValue: 'es',
          }
        // {
        //     provide: RecaptchaLoaderService,
        //     useClass: RecaptchaDynamicLanguageLoaderService,
        // },
    ],
})
export class CustomRecaptchaModule { }
