import { Component, signal, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LateralBarComponent } from '../../components/shared/lateralBar/lateralBarComponent';
import { FeedService } from '../../service/feedService.service';
import { CategoryService } from '../../service/category.service';
import { Article } from '../../interfaces/article.interface';
import { ArticleCardComponent } from '../../components/shared/articlecard/articlecard';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, LateralBarComponent, ArticleCardComponent],
  templateUrl: './homePage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomePageComponent implements OnInit, OnDestroy {
  visibleArticles = signal<Article[]>([]);

  private feedService = inject(FeedService);
  private categoryService = inject(CategoryService);

  currentPage = 0;
  private currentCategory?: string;
  private maxPages = 15;

  isLast = false;
  isLoading = false;
  hasMore = true;

  categoriaSeleccionada: string = 'mixed';
  private categorySub?: Subscription;

  constructor() {
    if (typeof localStorage !== 'undefined') {
      const cached = sessionStorage.getItem('cachedArticles');
      if (cached) {
        this.visibleArticles.set(JSON.parse(cached));
      }
    }
  }

  ngOnInit(): void {
    this.categorySub = this.categoryService.selectedCategory$.subscribe((category) => {
      if (this.categoriaSeleccionada !== category) {
        this.categoriaSeleccionada = category;
        this.getFeed(category);
      } else if (this.visibleArticles().length === 0) {
        this.getFeed(category);
      }
    });
  }

  ngOnDestroy(): void {
    this.categorySub?.unsubscribe();
  }

  cambiarCategoria(nuevaCategoria: string) {
    this.categoryService.setCategory(nuevaCategoria);
  }

  onAISummary(id: string) {
    alert('Resumen IA para artículo: ' + id);
  }

  onReadFull(id: string) {
    alert('Leer artículo completo: ' + id);
  }

  onSubscriptionChanged(sourceName: string) {
    const articulosActualizados = this.visibleArticles().map((articulo) => {
      if (articulo.source?.name === sourceName) {
        return { ...articulo, isSubscribed: true };
      }
      return articulo;
    });
    this.visibleArticles.set(articulosActualizados);
  }

  getFeed(category?: string) {
    this.categoriaSeleccionada = category ?? 'mixed';
    const categoriaParam = category === 'mixed' ? undefined : category;
    this.currentCategory = categoriaParam;
    this.currentPage = 0;
    this.hasMore = true;
    this.isLast = false;
    this.isLoading = false;
    this.visibleArticles.set([]);
    this.loadMoreArticles();
  }

  loadMoreArticles() {
    if (this.isLoading || !this.hasMore) return;

    this.isLoading = true;

    this.feedService.getScroll(this.currentCategory, this.currentPage).subscribe({
      next: (artic) => {
        if (artic && Array.isArray(artic.content) && artic.content.length > 0) {
          const currentIds = new Set(this.visibleArticles().map((a) => a.id));
          const newArticles = artic.content.filter((a) => !currentIds.has(a.id));
          const updated = [...this.visibleArticles(), ...newArticles];
          this.visibleArticles.set(updated);
         sessionStorage.setItem('cachedArticles', JSON.stringify(updated));
          this.currentPage++;
          this.hasMore = artic.content.length > 0 && this.currentPage < this.maxPages;
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
      },
    });
  }

  refreshFeed() {
    if (this.isLoading) return;
    this.isLoading = true;

    this.feedService.getFeed(this.currentCategory).subscribe({
      next: (response) => {
        if (response && Array.isArray(response.content) && response.content.length > 0) {
          const currentArticles = this.visibleArticles();
          this.visibleArticles.set([...response.content, ...currentArticles]);
        } else {
          alert('Estás al día. No hay noticias más recientes.');
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
      },
    });
  }

  onScroll(event: Event): void {
    const target = event.target as HTMLElement;
    if (target.scrollTop + target.clientHeight >= target.scrollHeight - 200) {
      if (!this.isLoading && this.hasMore) {
        this.loadMoreArticles();
      }
    }
  }
}
