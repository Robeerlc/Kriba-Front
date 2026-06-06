import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../service/credentialsService.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class GuestGuard implements CanActivate {
    constructor(
        private loginService: LoginService,
        private router: Router,
        @Inject(PLATFORM_ID) private platformId: Object
    ) { }

    canActivate(): Observable<boolean> | boolean {
        if (!isPlatformBrowser(this.platformId)) {
            return true;
        }

        return this.loginService.userLoginOn.pipe(
            take(1),
            map(isLoggedIn => {
                if (isLoggedIn) {
                    this.router.navigate(['/home']);
                    return false;
                }
                return true;
            })
        );
    }
}