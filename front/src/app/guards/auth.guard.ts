import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../service/credentialsService.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private loginService: LoginService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object // <-- Añadimos esto
  ) { }

  canActivate(): Observable<boolean> | boolean {
    // Si Angular está renderizando en el servidor (SSR), le decimos que sí
    // para que no interrumpa la carga prematuramente.
    if (!isPlatformBrowser(this.platformId)) {
      return true;
    }

    // Una vez en el navegador, hace la comprobación real
    return this.loginService.userLoginOn.pipe(
      take(1),
      map(isLoggedIn => {
        if (isLoggedIn) {
          return true;
        }
        this.router.navigate(['/']);
        return false;
      })
    );
  }
}