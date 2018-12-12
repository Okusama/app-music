import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router} from '@angular/router';
import {AuthService} from './AuthService';

@Injectable({
    providedIn: 'root'
})
export class GuardService implements CanActivate {

    constructor(private aS: AuthService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any | boolean {
        console.log("canActivate");
        if (this.aS.isLogin()) {
            console.log("log");
            return true;
        }
        return this.aS.isCurrentUserObservable().onAuthStateChanged((user) => {
            if (user === null) {
                this.router.navigate(['/login'], {
                    queryParams: {messageError: 'Error authentification'}
                });
            } else {
                this.router.navigate(['/admin'], {
                    queryParams: {messageError: 'Success'}
                });
            }
        });
    }
}