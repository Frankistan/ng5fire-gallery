import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { SnackbarService } from '../shared/services/snackbar.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private auth: AuthService,
        private router: Router,
        private snackBar: SnackbarService
    ) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.auth.isAuthenticated.map<boolean, boolean>((isAuthenticated: boolean) => {
            if (!isAuthenticated) {
                this.snackBar.open('toast.server.access_denied', 'toast.close', 1500);
                // this.router.navigate(['/login']);

                // not logged in so redirect to login page with the return url and return false
                this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            }
            return isAuthenticated;
        });
    }
}
