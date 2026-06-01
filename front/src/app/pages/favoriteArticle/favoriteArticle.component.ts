import { Component, inject, OnInit, signal } from '@angular/core';
import { FeedService } from '../../service/feedService.service';
import { LoginInterface } from '../../interfaces/loginInterface';
import { ArticleCardComponent } from "../../components/shared/articlecard/articlecard";
import { LateralBarComponent } from "../../components/shared/lateralBar/lateralBarComponent";

@Component({
  selector: 'app-favorite-aricle',
  imports: [ArticleCardComponent, LateralBarComponent],
  templateUrl: './favoriteArticle.component.html',
  styleUrl: './favoriteArticle.component.css',
})
export class FavoriteAricle implements OnInit {

  favorites = signal<any[]>([]); 
  // No constructor vacio
  // No duplico el nombre del servicio como en el constructor
  // Se puede usar dentro de una funcion
  private feedService = inject(FeedService);

  // Cargar los datos del componente
  // En constructor falla, porque el componente se crea en memoria
  // Garantiza que el componente ya esta cargado
  ngOnInit() {
    const email = localStorage.getItem('email') || '';
    const password = localStorage.getItem('password') || '';
    
    const userPayload: LoginInterface = { email, password };

    this.feedService.favoriteList(userPayload).subscribe({
      next: (data) => this.favorites.set(data),
      error: (err) => console.error('Error cargando favoritos:', err)
    });
  }

  onFavoriteRemoved(idEliminado: string): void {
    this.favorites.update(listaActual => 
      listaActual.filter(fav =>fav.externalArticleId !== idEliminado)
    );
  }
}
