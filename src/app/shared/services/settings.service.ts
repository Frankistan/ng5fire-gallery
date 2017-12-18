import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { SnackbarService } from './snackbar.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../../models/user';
import _ from 'lodash';

@Injectable()
export class SettingsService {

    loadSettings: BehaviorSubject<any> = new BehaviorSubject({});
    user: User;
    userRef: AngularFirestoreDocument<User>;

    constructor(
        private auth: AuthService,
        private afs: AngularFirestore,
        private snackBar: SnackbarService,
    ) {
        this.auth.user.subscribe((user) => {
            if (!user) return;
            this.user = user;
            this.userRef = this.afs.doc(`users/${user.uid}`);
            this.load(user.settings);
        });
    }


    private load(databaseSettings= {}) {
        let defaults = {
            language: window.navigator.language.toLocaleLowerCase().split("-")[0],
            isDark: false
        };

        let localSettings = JSON.parse(localStorage.getItem('settings')) || {};

        let userSettings = _.merge({}, localSettings, databaseSettings);

        let settings = _.merge({}, defaults, userSettings);

        localStorage.setItem('settings', JSON.stringify(settings));

        this.loadSettings.next(settings);
    }

    saveSettings(newSettings: any) {
        let localSettings = JSON.parse(localStorage.getItem('settings')) || {};

        let settings = _.merge({}, localSettings, newSettings);

        localStorage.setItem('settings', JSON.stringify(settings));

        if (this.user) {
            this.user.settings = settings;
            this.userRef.set(this.user)
                .then(success => { this.snackBar.open('toast.settings_saved', 'toast.close'); })
                .catch(error => { this.snackBar.open('toast.firebase.' + error.code, 'toast.close'); });

            this.loadSettings.next(settings);
        }
    }
}
