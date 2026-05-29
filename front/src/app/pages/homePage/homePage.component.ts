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
  
  private currentPage = 0;
  private currentCategory?: string;
  
  isLast = false;
  isLoading = false;
  hasMore = true;

  constructor() {
    this.loadMoreArticles();
  }

  // ⚡ 1. Método para cambiar de categoría
  getFeed(category?: string){
    this.currentCategory = category;
    this.currentPage = 0;
    this.hasMore = true;
    this.isLast = false;
    this.isLoading = false;
    this.visibleArticles.set([]);
    this.loadMoreArticles(); // Carga la primera página de la nueva categoría
  }

  // ⚡ 2. SCROLL: Método para traer noticias MÁS ANTIGUAS (Al bajar)
  loadMoreArticles() {
    if(this.isLoading || !this.hasMore) return;

    this.isLoading = true;
    const all = this.visibleArticles();

    this.feedService.getScroll(this.currentCategory, this.currentPage).subscribe({
      next: (artic) => {
        this.visibleArticles.set([...all, ...artic.content]);
        this.currentPage++;
        
        // ⚡ LA CORRECCIÓN: Ignoramos artic.last
        // Solo paramos de pedir si el backend nos devuelve 0 noticias
        this.isLast = artic.content.length === 0;
        this.hasMore = artic.content.length > 0;
        
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  // ⚡ 3. REFRESH: Método para traer noticias NUEVAS (Tirar para recargar o botón)
  // Dile al Front que llame a esto con un botón "Nuevas Noticias" arriba del todo
  refreshFeed() {
    if (this.isLoading) return;
    this.isLoading = true;

    this.feedService.getFeed(this.currentCategory).subscribe({
      next: (response) => {
        const allArticles = this.visibleArticles();
        // Añadimos las noticias nuevas AL PRINCIPIO de la lista
        if (response.content && response.content.length > 0) {
           this.visibleArticles.set([...response.content, ...allArticles]);
        } else {
           alert("Estás al día. No hay noticias más recientes.");
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error al refrescar feed:', err);
      }
    });
  }

  // El evento de scroll se queda igual, el candado isLoading nos protege bastante bien
  onScroll(event: Event): void {
    const target = event.target as HTMLElement;
    // Si estamos a 200px del final, pedimos la siguiente página
    if (target.scrollTop + target.clientHeight >= target.scrollHeight - 200) {
      this.loadMoreArticles();
    }
  }

  onAISummary(id: string) {
    alert('Resumen IA para artículo: ' + id);
  }

  onReadFull(id: string) {
    alert('Leer artículo completo: ' + id);
  }
}