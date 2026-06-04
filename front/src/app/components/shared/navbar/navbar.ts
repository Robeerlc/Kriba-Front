import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { LoginService } from '../../../service/credentialsService.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class NavbarComponent {
  userLoginOn: boolean = false;
                                   // Almacena la subscripcion
  private loginSub?: Subscription; // Evita fugas de memoria, despues de cerrar la sesion
                                   // Varias subscripciones activas

  constructor(private loginService: LoginService, private router: Router){};

  ngOnInit(): void {
    this.loginSub = this.loginService.userLoginOn.subscribe({
      next: (loginStatus) => {
        this.userLoginOn = loginStatus;
      }
    });
  }

  onLogout(): void {
    this.loginService.logout();
    this.router.navigateByUrl('/login');
  }
  ngOnDestroy(): void {
    this.loginSub?.unsubscribe();
  }

<<<<<<< Updated upstream
=======
  get isRoute() {
    return this.router.url === '/' || this.router.url === '/register';
  }

>>>>>>> Stashed changes
}
