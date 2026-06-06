import { Component, ViewChild, ElementRef } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LoginService } from '../../../service/credentialsService.service';
import { CategoryService } from '../../../service/category.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

declare var bootstrap: any;

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class NavbarComponent {
  userLoginOn: boolean = false;
  @ViewChild('navbarToggler', { static: false }) navbarToggler?: ElementRef;
  @ViewChild('navbarCollapse', { static: false }) navbarCollapse?: ElementRef;

  categorias = [
    'mixed',
    'general',
    'world',
    'business',
    'technology',
    'entertainment',
    'sports',
    'science',
  ];

  private loginSub?: Subscription;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private categoryService: CategoryService
  ) { }

  selectCategory(category: string): void {
    this.categoryService.setCategory(category);
    this.closeNavbar();
  }

  get selectedCategory(): string {
    return this.categoryService.selectedCategory;
  }

  closeNavbar(): void {
    if (this.navbarToggler && this.navbarCollapse) {
      const bsCollapse = new bootstrap.Collapse(this.navbarCollapse.nativeElement, {
        toggle: false
      });
      bsCollapse.hide();
    }
  }

  ngOnInit(): void {
    this.loginSub = this.loginService.userLoginOn.subscribe({
      next: (loginStatus) => {
        this.userLoginOn = loginStatus;
      }
    });
  }

  onLogout(): void {
    this.loginService.logout();
    this.closeNavbar();
    this.router.navigateByUrl('/');
  }

  ngOnDestroy(): void {
    this.loginSub?.unsubscribe();
  }

  get isRoute() {
    return this.router.url === '/' || this.router.url === '/register';
  }

}
