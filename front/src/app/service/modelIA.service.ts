import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Summary } from '../interfaces/summary.interface';
import { MatDialog } from '@angular/material/dialog';
import { ModelIA } from '../components/shared/modelIA/modelIA';

@Injectable({
  providedIn: 'root',
})
export class ModelIAService {
  private http = inject(HttpClient);
  private API_URL = 'https://kriba-d08ba5-193-70-44-51.sslip.io/api/v1/ai/summarize';
  private readonly _dialog = inject(MatDialog);
  private bodyOverflowBackup = '';
  private htmlOverflowBackup = '';

  getSummary(textContent: string, articleUrl: string, category: string, externalId: string): Observable<Summary> {
    if (typeof localStorage == 'undefined') {
      return throwError(() => new Error('No hay sesion'));
    }
    const email = localStorage.getItem('email');
    const pass = localStorage.getItem('password');
    const body = {
      loginRequest: {
        email: email,
        password: pass,
      },
      textContent: textContent,
      articleUrl: articleUrl,
      category: category,
      externalArticleId: externalId
    };

    return this.http.post<Summary>(this.API_URL, body).pipe(catchError(this.handleError));
  }

  openModel(articleTitle: string, articleContent: string, articleUrl: string, articleCategory:string, article:any ) {
    if (typeof document !== 'undefined') {
      this.bodyOverflowBackup = document.body.style.overflow;
      this.htmlOverflowBackup = document.documentElement.style.overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    }

    const dialogRef = this._dialog.open(ModelIA, {
      width: '400px',
      maxWidth: '90vw',
      position: { right: '0', top: '0' },
      panelClass: 'slide-in-modal',
      hasBackdrop: true,
      autoFocus: false,
      data: {
        title: articleTitle,
        content: articleContent,
        url: articleUrl,
        category: articleCategory,
        article: article,
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = this.bodyOverflowBackup || '';
        document.documentElement.style.overflow = this.htmlOverflowBackup || '';
      }
    });
  }

  closeModal() {
    this._dialog.closeAll();
    if (typeof document !== 'undefined') {
      document.body.style.overflow = this.bodyOverflowBackup || '';
      document.documentElement.style.overflow = this.htmlOverflowBackup || '';
    }
  }

  private handleError(error: HttpErrorResponse) {
    let errorMsg = 'Algo inesperado ha surgido';

    if (error.status === 0) {
      console.error('Error de red: ' + error.error);
      errorMsg = 'No se pudo conectar con el servidor. Revisa tu conexión.';
    } else {
      console.error('Error de back: ', error.status, error.error);
      // Si el backend responde con 400 (por límite diario de IA), mostrar mensaje claro
      if (error.status === 400) {
        errorMsg = 'No le quedan intentos para hoy. Vuelve mañana para generar más resúmenes.';
      } else if (error.error?.error) {
        errorMsg = error.error.error;
      } else if (error.error?.message) {
        errorMsg = error.error.message;
      }
    }

    return throwError(() => new Error(errorMsg));
  }
}
