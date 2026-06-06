import { Component, inject, signal, OnDestroy, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common'; // <-- Añadido
import { LateralBarComponent } from '../../components/shared/lateralBar/lateralBarComponent';
import { UserService } from '../../service/user.service';
import { StatsChart } from '../../components/shared/chart/statsChart/statsChart';
import { CategoryStats } from '../../interfaces/categoryStats.interface';
import { StatsService } from '../../service/stats.service';
import { Router } from '@angular/router';
import { LoginService } from '../../service/credentialsService.service';

@Component({
  templateUrl: 'userPage.component.html',
  imports: [LateralBarComponent, StatsChart],
  standalone: true,
  styleUrl: 'userPage.component.css'
})
export class UserPageComponent implements OnDestroy {
  private loginService = inject(LoginService);
  private userService = inject(UserService);
  private router = inject(Router);
  private statsService = inject(StatsService);
  private platformId = inject(PLATFORM_ID); // <-- Añadido

  private auth: any;
  userName = signal<string>('');
  userEmail = signal<string>('');
  dailyUses = signal<number>(0);
  totalArticlesRead = signal<number>(0);
  generalData = signal<CategoryStats[]>([]);

  private remainingUsesHandler = (event: any) => {
    this.dailyUses.set(Number(event.detail));
  };

  constructor() {
    // PROTECCIÓN SSR: Todo esto solo se ejecuta en el navegador
    if (isPlatformBrowser(this.platformId)) {

      if (typeof localStorage !== 'undefined') {
        this.auth = JSON.parse(localStorage.getItem('auth') || '{}');
        this.userName.set(this.auth.user?.username ?? '');
        this.userEmail.set(localStorage.getItem('email') ?? '');
        this.dailyUses.set(Number(localStorage.getItem('remainingUses') ?? 3));
      }

      // El listener de window ahora es seguro
      window.addEventListener('remainingUsesChanged', this.remainingUsesHandler as EventListener);

      // Metemos la llamada a stats aquí porque probablemente requiera el token del usuario
      this.statsService.getStatistics().subscribe({
        next: (stats) => {
          this.totalArticlesRead.set(stats.totalArticlesRead);
          this.generalData.set(stats.generalData.sort((a, b) => b.percentage - a.percentage));
        },
        error: (err) => console.error(err),
      });
    }
  }

  ngOnDestroy(): void {
    // PROTECCIÓN SSR: Comprobamos antes de quitar el listener
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('remainingUsesChanged', this.remainingUsesHandler as EventListener);
    }
  }

  openEditModal(): void {
    this.userService.openEditModel();
  }

  deleteUser() {
    if (!confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.')) return;
    this.userService.deleteUser().subscribe({
      next: () => {
        this.loginService.logout();
        localStorage.clear();
        sessionStorage.clear();
        this.router.navigate(['/']);
      },
      error: (err) => console.error(err)
    });
  }
}