import { Component, inject, signal } from '@angular/core';
import { LateralBarComponent } from '../../components/shared/lateralBar/lateralBarComponent';
import { UserService } from '../../service/user.service';
import { StatsChart } from '../../components/shared/chart/statsChart/statsChart';
import { CategoryStats } from '../../interfaces/categoryStats.interface';
import { StatsService } from '../../service/stats.service';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../components/shared/navbar/navbar';
import { LoginService } from '../../service/credentialsService.service';

@Component({
  templateUrl: 'userPage.component.html',
  imports: [LateralBarComponent, StatsChart],
  standalone: true
})
export class UserPageComponent {
  private loginService = inject(LoginService);
  private userService = inject(UserService);
  private router = inject(Router)
  private auth: any;
  userName = signal<string>('');
  userEmail = signal<string>('');
  dailyUses = signal<number>(0);
  totalArticlesRead = signal<number>(0);
  generalData = signal<CategoryStats[]>([]);
  private statsService = inject(StatsService);
  ngOnInit(): void {
    if (typeof localStorage === 'undefined') {
      return;
    }

    this.auth = JSON.parse(localStorage.getItem('auth') || '{}');
    this.userName.set(this.auth.user?.username ?? '');
    this.userEmail.set(localStorage.getItem('email') ?? '');
    this.dailyUses.set(Number(localStorage.getItem('remainingUses') ?? 3));

    this.statsService.getStatistics().subscribe({
      next: (stats) => {
        this.totalArticlesRead.set(stats.totalArticlesRead);
        this.generalData.set(stats.generalData.sort((a, b) => b.percentage - a.percentage));
      },
      error: (err) => console.error(err),
    });
  }

  openEditModal(): void {
    this.userService.openEditModel();
  }



  deleteUser(){
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
