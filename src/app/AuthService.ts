import {Injectable} from '@angular/core';

import * as firebase from "firebase/app";
import "firebase/auth";
import {Router} from '@angular/router';
import {Subject} from 'rxjs/index';

@Injectable({
    providedIn: "root"
})
export class AuthService {

    authState: boolean;

    constructor(private router: Router) {
        firebase.auth().onAuthStateChanged( (user) => {
            if (user) {
                this.authState = true;
            } else {
                this.authState = false;
            }
        });
    }

    auth(email: string, password: string): Promise<any>{
        return firebase.auth().signInWithEmailAndPassword(email, password);
    }

    logOut(isLogin: boolean) {
        this.authenticated(isLogin);
        firebase.auth().signOut();
        this.router.navigate(["/albums"]);
    }

    authenticated(isLogin: boolean) {
        return this.authState = isLogin;
    }

    logIn(isLogin: boolean) {
        this.authenticated(isLogin);
        this.router.navigate(["/dashboard"]);
    }

    isLogin(): boolean{
        return this.authState === true;
    }

}
