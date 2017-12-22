import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class LocationService {

    // private geolocationPosition: Position;
    private position:any = null;
    private address$: BehaviorSubject<string> = new BehaviorSubject("profile.location_not_available");

    constructor(
        private _http: HttpClient,
    ) {
        this.getLocation();
    }

    getLocation() {
        if (window.navigator && window.navigator.geolocation) {
            window.navigator.geolocation.getCurrentPosition(
                position => {
                    this.position = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
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

    get getAddress(): Observable<string> {
        if(!this.position ) {
            return Observable.of('empty');
        }

        return this._http
            .get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.position.lat},${this.position.lng}&sensor=false`)
            .map(res => {
                if (!res) return 'empty';
                let data: any = res;
                return data.results[1].formatted_address;
            });
    }
}
