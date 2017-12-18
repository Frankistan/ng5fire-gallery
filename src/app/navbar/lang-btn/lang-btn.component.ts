import { Component, OnInit } from '@angular/core';
import { CoreService } from '../../shared/services/core.service';
import { SettingsService } from '../../shared/services/settings.service';

@Component({
    selector: 'lang-btn',
    templateUrl: './lang-btn.component.html',
    styleUrls: ['./lang-btn.component.css']
})
export class LangBtnComponent implements OnInit {

    constructor(
        public coreSrv: CoreService,
        private settingsService: SettingsService,
    ) { }

    ngOnInit() {
    }

    switchLanguage(language: string) {
        let settings = {
            language: language
        };

        this.coreSrv.language.next(language);
        this.settingsService.saveSettings(settings);
    }

}
