import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import Chart, { ChartType } from 'chart.js/auto';
import { StatsService } from '../../../../service/stats.service';

@Component({
  selector: 'app-stats-chart',
  imports: [],
  templateUrl: './statsChart.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatsChart implements OnInit {
  public chart!: Chart;
  private statsService = inject(StatsService);

  ngOnInit(): void {
    this.statsService.getStatistics().subscribe({
      next: (stats) => {
        const labels = stats.generalData.map(item => item.category);
        const values = stats.generalData.map(item => item.percentage);

        this.chart = new Chart('chart', {
          type: 'polarArea' as ChartType,
          data: {
            labels: labels,
            datasets: [{
              label: 'Categorías',
              data: values,
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(75, 192, 192)',
                'rgb(255, 205, 86)',
                'rgb(201, 203, 207)',
                'rgb(54, 162, 235)'
              ]
            }]
          }
        });
      },
      error: (err) => console.error(err)
    });
  }
}
