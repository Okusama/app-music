import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router} from '@angular/router';
import {AuthService} from './AuthService';

@Injectable({
    providedIn: "root"
})
export class GuardService implements CanActivate {

    constructor(private aS: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any | boolean{

        this.aS.authState.subscribe(isLogin => {
            console.log(isLogin);
            if (isLogin) {
                return true;
            } else {
                this.router.navigate(["/albums"],{
                    queryParams: { messageError: 'Error authentification'}
                });
            }
        });
    }

}