import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
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
export class NavbarComponent implements AfterViewInit {
  userLoginOn: boolean = false;
  menuOpen = false;
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

  toggleNavbar(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeNavbar(): void {
    this.menuOpen = false;
  }

  ngAfterViewInit(): void {
    // Ensure Bootstrap is fully loaded
    if (typeof window !== 'undefined' && (window as any).bootstrap) {
      console.log('Bootstrap loaded successfully');
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
