import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LateralBarComponent } from '../../components/shared/lateralBar/lateralBarComponent';
import { ArticleCardComponent } from '../../components/shared/articlecard/articlecard';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, LateralBarComponent, ArticleCardComponent],
  templateUrl: './homePage.component.html',
  styleUrls: ['./homePage.component.css']
})
export class HomePageComponent implements OnInit {
  // Variables simples
  articles: any[] = [];
  recomendaciones: any[] = [];
  cargando: boolean = true;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargarArticulos();
  }

  cargarArticulos() {
    // Cargar el JSON
    this.http.get('/api/feed.json').subscribe({
      next: (data: any) => {
        this.articles = data.articles;
        this.recomendaciones = data.recommendations;
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar:', error);
        this.cargando = false;
      }
    });
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
