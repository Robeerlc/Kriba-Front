import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
 
@Injectable({
  providedIn: 'root',
})
export class InteractionService {
  private http = inject(HttpClient);
 
  private API_URL = 'http://localhost:8080/api/v1/interactions';
 
  postInteraction(category: string, interactionType: string, externalArticleId: string) {
    const email = localStorage.getItem('email');
    const pass = localStorage.getItem('password');
 
    const body = {
      loginRequest: {
        email: email,
        password: pass,
      },
      articleCategory: category,
      externalArticleId: externalArticleId,
      interactionCategory: interactionType
    };
    return this.http.post(this.API_URL, body).pipe(catchError(this.handleError));
  }
 
  private handleError(error: HttpErrorResponse) {
    let errorMsg = 'Algo inesperado ha surgido';
    if (error.status === 0) {
      console.error('Error de red', error.error);
    } else {
      console.error('Error de back:', error.status, error.error);
      if (error.error?.error) {
        errorMsg = error.error.error;
      }
    }
    return throwError(() => new Error(errorMsg));
  }
}