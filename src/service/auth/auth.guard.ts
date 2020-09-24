import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        console.log("currentUser:", currentUser);
        if (currentUser) {
            console.log("roles", route.data.roles);
            console.log("user", currentUser.Role);
            // check if route is restricted by role
            if (route.data.roles && route.data.roles.indexOf(currentUser.Role) === -1) {
                // role not authorised so redirect to home page? or login page? error?
                //  TODO: probably home page with a message
                console.log(currentUser.Role + " role. going home");
                this.router.navigate(['/']);
                return false;
            }

            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        // TODO: replace with name of actual login route
        this.router.navigate(['/Login']);
        return false;
    }
}