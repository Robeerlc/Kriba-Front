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
          type: 'doughnut' as ChartType,
          data: {
            labels: labels,
            datasets: [{
              label: 'Categorías',
              data: values,
              backgroundColor: [
                'rgb(54, 162, 235)',
                'rgb(75, 192, 192)',
                'rgb(255, 206, 86)',
                'rgb(153, 102, 255)',
                'rgb(255, 159, 64)',
                'rgb(201, 203, 207)',
                'rgb(255, 99, 132)',
                'rgb(99, 255, 132)'
              ],
              borderColor: [
                'rgb(54, 162, 235)',
                'rgb(75, 192, 192)',
                'rgb(255, 206, 86)',
                'rgb(153, 102, 255)',
                'rgb(255, 159, 64)',
                'rgb(201, 203, 207)',
                'rgb(255, 99, 132)',
                'rgb(99, 255, 132)'
              ],
              borderWidth: 2
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                  padding: 15,
                  font: {
                    size: 12
                  }
                }
              }
            }
          }
        });
      },
      error: (err) => console.error(err)
    });
  }
}
