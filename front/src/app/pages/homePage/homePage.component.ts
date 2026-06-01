import { Component, OnInit, signal, inject } from '@angular/core';
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
export class HomePageComponent implements OnInit {
  articles = signal<Article[]>([]);
  private feedService = inject(FeedService);

  categorias = ['mixed', 'general', 'world', 'business', 'technology', 'entertainment', 'sports', 'science'];
  
  categoriaSeleccionada: string = 'mixed';

  ngOnInit() {
    this.cargarNoticias('mixed');
  }

  cargarNoticias(categoria: string) {
    const categoriaParam = categoria === 'mixed' ? undefined : categoria;

    this.feedService.getFeed(categoriaParam).subscribe({
      next: (data) => {
        this.articles.set(data.articles)
        console.log(data.articles);
      },
      error: (err) => console.error(err)
    });
  }

  cambiarCategoria(nuevaCategoria: string) {
    this.categoriaSeleccionada = nuevaCategoria;
    this.cargarNoticias(nuevaCategoria);
  }

  onAISummary(id: string) {
    alert('Resumen IA para artículo: ' + id);
  }

  onReadFull(id: string) {
    alert('Leer artículo completo: ' + id);
  }

  onSubscriptionChanged(sourceName: string) {
    const articulosActualizados = this.articles().map(articulo => {
      if (articulo.source?.name === sourceName) {
        //... son las propiedes del objeto
        // solo isSubscribed elimino todas las propiedades :P
        return { ...articulo, isSubscribed: true };
      }
      return articulo;
    });   
    this.articles.set(articulosActualizados);
  }
}