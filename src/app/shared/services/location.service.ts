import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { User } from '../../models/user';

@Injectable()
export class LocationService {

    position: any;

    constructor(private _http: HttpClient,
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
    ) {
        this.afAuth.authState.
            switchMap(user => {

                if (!user) return Observable.empty();
                return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
            }).subscribe((user: User) => {

                if (!user) return;

                this.position = user.location;
                this.getAddress();
            });
    }

    getLocation() {
        if (window.navigator && window.navigator.geolocation) {
            window.navigator.geolocation.getCurrentPosition(
                position => {
                    this.position = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    console.log('lcationSrv: ', this.position);

                },
                error => {
                    switch (error.code) {
                        case 1:
                            console.log('Permission Denied');
                            break;
                        case 2:
                            console.log('Position Unavailable');
                            break;
                        case 3:
                            console.log('Timeout');
                            break;
                    }
                    this.position = null;
                }
            );
        };
    }

    getAddress() {
        if (!this.position) {
            return Observable.of('empty');
        }

        let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.position.lat},${this.position.lng}&sensor=false`;

        return this._http
            .get(url)
            .map(res => {
                if (!res) return 'empty';
                let data: any = res;
                let ad = data.results[1];
                if (data.results[1]) return ad.formatted_address;
            });
    }
}


