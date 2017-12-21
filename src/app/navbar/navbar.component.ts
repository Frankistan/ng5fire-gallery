import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { CoreService } from '../shared/services/core.service';
import { AuthService } from '../shared/services/auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
    @Input('sidenav') sidenav: MatSidenav;

    title: BehaviorSubject<string> = new BehaviorSubject('title.app');
    isOpened: BehaviorSubject<boolean> = new BehaviorSubject(false);
    isSearching: boolean = false;
    displaySearchBtn: boolean = true;

    constructor(
        public coreSrv: CoreService,
        public auth: AuthService,
    ) {
        this.coreSrv.currentPath.subscribe((path) => {
            this.displaySearchBtn = path === "images";
        });
    }

    openSearch() {
        this.isSearching = true;
        this.coreSrv.isSearching.next(this.isSearching);
    }
}
