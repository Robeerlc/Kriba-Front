import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LateralBarComponent } from '../../components/shared/lateralBar/lateralBarComponent';
import { ArticleCardComponent } from '../../components/shared/articlecard/articlecard';
import { FeedService } from '../../service/feedService.service';
import { Article } from '../../interfaces/article.interface';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, LateralBarComponent, ArticleCardComponent],
  templateUrl: './homePage.component.html',
  styleUrls: ['./homePage.component.css']
})
export class HomePageComponent {
  visibleArticles = signal<Article[]>([]);
  private feedService = inject(FeedService);
  private currentPage = 0
  private totalPages = 0
  private currentCategory ?: string
  isLast = false

  isLoading = false;
  hasMore = true;

  constructor() {
      this.loadArticle()
  }

  onAISummary(id: string) {
    alert('Resumen IA para artículo: ' + id);
  }

  onReadFull(id: string) {
    alert('Leer artículo completo: ' + id);
  }



  getFeed(category?: string){
   this.currentCategory = category
   this.currentPage = 0
   this.hasMore = true;
   this.isLast = false
   this.isLoading = false;
   this.visibleArticles.set([])
   this.loadArticle()
  }


  loadArticle(){
    console.log('LoadArticle: ', {isLoaging:this.isLoading, hashMore:this.hasMore, currentPage:this.currentPage})

    if(this.isLoading || !this.hasMore)return;

    this.isLoading = true;
    const all = this.visibleArticles()

    this.feedService.getScroll(this.currentCategory, this.currentPage).subscribe({
      next: (artic)=>{
        console.log('respuesta getScroll', artic);
        this.visibleArticles.set([...all, ...artic.content])
        this.currentPage++;
        this.totalPages = artic.totalPages
        this.isLast = artic.last;
        this.hasMore = !artic.last
        this.isLoading=false;
      },error: (err)=>{
        this.isLoading = false
        console.error(err)
      }
    })

  }

  onScroll(event: Event): void {
    const target = event.target as HTMLElement;


    if (target.scrollTop + target.clientHeight >= target.scrollHeight - 200) {
      this.loadArticle();
    }
  }
}
