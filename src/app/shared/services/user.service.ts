import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { SnackbarService } from './snackbar.service';
import { User } from '../../models/user';
import * as firebase from 'firebase/app';

@Injectable()
export class UserService {
    user: firebase.User;
    userRef: AngularFirestoreDocument<User>;

    constructor(
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private snackBar: SnackbarService,
    ) { }

    update(user: User, password: string = "") {

        this.userRef = this.afs.doc(`users/${user.uid}`);

        if (password) {

            this.afAuth.auth.currentUser.updatePassword(password)
                .then(success => {
                    this.afAuth.auth.currentUser.updateProfile({
                        displayName: user.displayName,
                        photoURL: user.photoURL
                    });
                    this.afAuth.auth.currentUser.reload();
                    // this.afAuth.auth.currentUser.refreshToken;
                    this.userRef.set(user)
                        .then(success => { this.snackBar.open('toast.profile', 'toast.close'); })
                        .catch(error => this.errorHandler(error.code));

                })
                .catch(error => this.errorHandler(error.code));
        } else {
            this.afAuth.auth.currentUser.updateProfile({
                displayName: user.displayName,
                photoURL: user.photoURL
            });

            this.userRef.update(user)
                .then(success => { this.snackBar.open('toast.profile', 'toast.close'); })
                .catch(error => this.errorHandler(error.code));
        }
    }

    create(user: User) {

        this.userRef = this.afs.doc(`users/${user.uid}`);

        this.afAuth.auth.currentUser.updateProfile({
            displayName: user.displayName,
            photoURL: user.photoURL
        });

        this.userRef.set(user)
            .then(success => { this.snackBar.open('toast.profile', 'toast.close'); })
            .catch(error => this.errorHandler(error.code));
    }

    private errorHandler(error: any) {
        this.snackBar.open('toast.firebase.' + error, 'toast.close');
    }
}
