import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LateralBarComponent } from '../../components/shared/lateralBar/lateralBarComponent';
import { ArticleCardComponent } from '../../components/shared/articlecard/articlecard';
import { FeedService } from '../../service/feedService.servive';
import { Article } from '../../interfaces/article.interface';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, LateralBarComponent, ArticleCardComponent],
  templateUrl: './homePage.component.html',
  styleUrls: ['./homePage.component.css']
})
export class HomePageComponent {
  articles = signal<Article[]>([]);
  private feedService = inject(FeedService);

  constructor() {
    this.feedService.getFeed().subscribe({
      next: (data) => this.articles.set(data.articles),
      error: (err) => console.error(err)
    });
  }

  onAISummary(id: string) {
    alert('Resumen IA para artículo: ' + id);
  }

  onReadFull(id: string) {
    alert('Leer artículo completo: ' + id);
  }
}
