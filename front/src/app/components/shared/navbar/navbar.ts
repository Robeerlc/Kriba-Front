import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LoginService } from '../../../service/credentialsService.service';
import { CategoryService } from '../../../service/category.service';
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
  ) {}

  selectCategory(category: string): void {
    this.categoryService.setCategory(category);
  }

  get selectedCategory(): string {
    return this.categoryService.selectedCategory;
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
    this.router.navigateByUrl('/login');
  }
  ngOnDestroy(): void {
    this.loginSub?.unsubscribe();
  }

  get isRoute() {
    return this.router.url === '/' || this.router.url === '/register';
  }

}
