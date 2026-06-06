import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import { LoginService } from '../../../service/credentialsService.service';
import { CategoryService } from '../../../service/category.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class NavbarComponent implements OnInit, AfterViewInit, OnDestroy {
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

  ngOnInit(): void {
    this.loginSub = this.loginService.userLoginOn.subscribe({
      next: (loginStatus) => {
        this.userLoginOn = loginStatus;
      }
    });
  }

  ngAfterViewInit(): void {
    if (typeof window !== 'undefined' && (window as any).bootstrap) {
      console.log('Bootstrap loaded successfully');
    }
  }

  ngOnDestroy(): void {
    this.loginSub?.unsubscribe();
  }

  selectCategory(category: string): void {
    this.categoryService.setCategory(category);
    this.closeNavbar();
    this.router.navigateByUrl('/home');
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

  onLogout(): void {
    this.loginService.logout();
    this.closeNavbar();
    this.router.navigateByUrl('/');
  }

  get isRoute() {
    return this.router.url === '/' || this.router.url === '/register';
  }
}