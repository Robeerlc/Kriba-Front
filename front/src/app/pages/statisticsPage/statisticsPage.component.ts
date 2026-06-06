import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsService } from '../../service/stats.service';
import { StatsChart } from '../../components/shared/chart/statsChart/statsChart';
import { CategoryStats } from '../../interfaces/categoryStats.interface';
import { LateralBarComponent } from "../../components/shared/lateralBar/lateralBarComponent";

@Component({
  selector: 'statistics',
  standalone: true,
  imports: [CommonModule, StatsChart, LateralBarComponent],
  templateUrl: './statisticsPage.component.html',
  styleUrl: './statisticsPage.component.css'
})
export class StatsPageComponent {
  totalArticlesRead = signal<number>(0);
  generalData = signal<CategoryStats[]>([]);
  private statsService = inject(StatsService);

  constructor() {
    this.statsService.getStatistics().subscribe({
      next: (stats) => {
        this.totalArticlesRead.set(stats.totalArticlesRead);
        this.generalData.set(stats.generalData.sort((a, b) => b.percentage - a.percentage));
      },
      error: (err) => console.error(err),
    });
  }
}
