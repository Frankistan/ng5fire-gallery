import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { User } from '../../models/user';


@Injectable()
export class LocationService {
    user: User;
    address: Observable<any>;

    position: any = null;
    address$: BehaviorSubject<string> = new BehaviorSubject("profile.location_not_available");

    constructor(
        private _http: HttpClient,
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
    ) {
        this.afAuth.authState.
            switchMap((user) => {
                if (!user) return Observable.of(null);
                return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
            }).subscribe(user => {

                if (!this.user) {
                    this.address$.next('empty');
                }

                this._http
                    .get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${user.location.lat},${user.location.lng}&sensor=false`)
                    .map(res => {
                        if (!res) return 'empty';
                        let data: any = res;
                        return data.results[1].formatted_address;
                    }).subscribe(address => this.address$.next(address));
            })
    }

    getLocation() {
        if (window.navigator && window.navigator.geolocation) {
            window.navigator.geolocation.getCurrentPosition(
                position => {
                    this.position = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
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
}
