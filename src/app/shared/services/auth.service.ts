import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from "angularfire2/firestore";
import { SnackbarService } from './snackbar.service';
import { LocationService } from './location.service';
import { UserService } from './user.service';
import { Observable,BehaviorSubject } from 'rxjs';
import { User } from '../../models/user';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
    private _user$: Observable<User>;
    private _isLoggedIn$: Observable<boolean>;
    socialLogin: Observable<boolean>;
    lastLoginAt: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private router: Router,
        private snackBar: SnackbarService,
        private userService: UserService,
        private location: LocationService
    ) {
        this._user$ = this.afAuth.authState.
            switchMap((user) => {

                if (user) {
                    this.lastLoginAt.next(user.metadata.lastSignInTime);

                    this.socialLogin = Observable.of(user.providerData[0].providerId != "password");
                    return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
                } else {
                    this.socialLogin = Observable.of(false);
                    return Observable.of(null);
                }
            });

        this._isLoggedIn$ = this.afAuth.authState
            .map<firebase.User, boolean>((user: firebase.User) => {
                return user != null;
            });
    }

    login(email: string, password: string): Promise<any> {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password)
            .then((user) => {
                const data: User = {
                    uid: user.uid,
                    location: this.location.position
                };
                this.userService.update(data);
                this.router.navigate(['/images']);
            })
            .catch(error => this.errorHandler(error.code));

    }

    signup(user: any = {}) {
        return Observable.fromPromise(this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
            .then((firebaseUser) => {
                const data: User = {
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    displayName: user.name,
                    photoURL: user.photoURL
                };
                this.userService.create(data);
            }));
    }

    logout() {
        this.afAuth.auth.signOut()
            .then(success => { this.router.navigate(['/login']); })
            .catch (error => this.errorHandler(error.code));
    }

    resetPassword(email: string): Promise<any> {
        var auth = firebase.auth();
        return auth.sendPasswordResetEmail(email);
    }

    loginWithProvider(providerName: string): Promise<void> {

        let provider = null;
        switch (providerName) {
            case 'google':
                provider = new firebase.auth.GoogleAuthProvider();
                break;
            case 'facebook':
                provider = new firebase.auth.FacebookAuthProvider();
                break;
            case 'github':
                provider = new firebase.auth.GithubAuthProvider();
                break;
            default: ;

        }
        return this.oAuthLogin(provider);
    }

    private oAuthLogin(provider) {
        return this.afAuth.auth.signInWithPopup(provider)
            .then((credential) => {

                const data: User = {
                    uid: credential.user.uid,
                    email: credential.additionalUserInfo.profile.email || "",
                    displayName: credential.user.displayName,
                    photoURL: credential.user.photoURL
                };

                this.userService.update(data);
            })
    }

    get user(): Observable<User> {
        return this._user$;
    }

    get isAuthenticated(): Observable<boolean> {
        return this._isLoggedIn$;
    }

    private errorHandler(error: any) {
        this.snackBar.open('toast.firebase.' + error, 'toast.close');
    }
}
