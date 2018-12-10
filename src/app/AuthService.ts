import {Injectable} from '@angular/core';

import * as firebase from "firebase/app";
import "firebase/auth";
import {Router} from '@angular/router';
import {Subject} from 'rxjs/index';

@Injectable({
    providedIn: "root"
})
export class AuthService {

    authState = new Subject<boolean>();

    constructor(private router:Router){

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.authState.next(true);
            } else {
                this.authState.next(false);
            }
        });

    }

    auth(email: string, password: string): Promise<any>{
        return firebase.auth().signInWithEmailAndPassword(email, password);
    }

    logOut() {
        this.authState.next(false);
        //this.router.navigate(["/"]);
    }

    authenticated(isLogin: boolean){
        return this.authState.next(isLogin);
    }

}
