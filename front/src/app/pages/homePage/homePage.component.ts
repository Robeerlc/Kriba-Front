import { Component, inject, signal } from '@angular/core';
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
  // Variables simples
 articles = signal<Article[]>([]);
  private feedService = inject(FeedService)
  constructor() {
    this.feedService.getFeed().subscribe(data=>{
       this.articles.set(data.articles);
    })
  }



  // Acciones simples
  onAISummary(id: string) {
    alert('Resumen IA para artículo: ' + id);
  }

  onReadFull(id: string) {
    alert('Leer artículo completo: ' + id);
  }

  onSummarize(id: string) {
    alert('Resumen para: ' + id);
  }
}
