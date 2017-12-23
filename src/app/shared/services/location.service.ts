import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LocationService {

    position: any = null;

    constructor(private _http: HttpClient) { }

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

    getAddress(position: any = {}) {
        if (!position) {
            return Observable.of('empty');
        }

        let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.lat},${position.lng}&sensor=false`;

        return this._http
            .get(url)
            .map(res => {
                if (!res) return 'empty';
                let data: any = res;
                return data.results[1].formatted_address;
            });
    }
}


