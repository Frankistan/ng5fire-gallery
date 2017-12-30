import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { CoreService } from '../shared/services/core.service';
import { AuthService } from '../shared/services/auth.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
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

    ngOnInit() {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.title = this.coreSrv.title;
    }

    openSearch() {
        this.sidenav.close();
        this.isSearching = true;
        this.coreSrv.isSearching.next(this.isSearching);
    }
}
