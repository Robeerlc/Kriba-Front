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
    this._dialog.open(ModelIA, {
      width: '400px',
      maxWidth: '90vw',
      position: { right: '0', top: '0' },
      panelClass: 'slide-in-modal',
      hasBackdrop: false,
      autoFocus: false,
      data: {
        title: articleTitle,
        content: articleContent,
        url: articleUrl,
        category: articleCategory,
        article: article,

      }
  });
}

  closeModal() {
    this._dialog.closeAll();
  }

  private handleError(error: HttpErrorResponse) {
    let errorMsg = 'Algo inesperado ha surgido';

    if (error.status === 0) {
      console.error('Error de red: ' + error.error);
    } else {
      console.error('Error de back: ', error.status, error.error);
      if (error.error?.error) {
        errorMsg = error.error.error;
      }
    }

    return throwError(() => new Error(errorMsg));
  }
}
