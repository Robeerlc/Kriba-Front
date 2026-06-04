import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Statistics } from '../interfaces/statistics.interface';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  private http = inject(HttpClient);

<<<<<<< Updated upstream
  private API_URL = 'http://localhost:8080/api/v1/statistics';

  getStatistics(): Observable<Statistics> {
    /*if (typeof localStorage === 'undefined') {
=======
  private API_URL = 'https://kriba-d08ba5-193-70-44-51.sslip.io/api/v1/statistics';

  getStatistics(): Observable<Statistics> {
    if (typeof localStorage === 'undefined') {
>>>>>>> Stashed changes
      return throwError(() => new Error('No hay sesión'));
    }

    const email = localStorage.getItem('email');
    const pass = localStorage.getItem('password');
    const body = {
<<<<<<< Updated upstream
      loginRequest: {
        email: email,
        password: pass,
      },
    };

    return this.http.post<Statistics>(this.API_URL, body).pipe(catchError(this.handleError));*/
    if (typeof localStorage === 'undefined') {
      return throwError(() => new Error('No hay sesión'));
    }
    return this.http.get<Statistics>('/api/stats.json').pipe(catchError(this.handleError));
=======
        email: email,
        password: pass,
    };

    return this.http.post<Statistics>(this.API_URL, body).pipe(catchError(this.handleError));
>>>>>>> Stashed changes
  }

  private handleError(error: HttpErrorResponse) {
    let errorMsg = 'Algo inesperado ha surgido';

    if (error.status === 0) {
      console.error('Error de red' + error.error);
    } else {
      console.error('Error de back: ', error.status, error.error);
      if (error.error?.error) {
        errorMsg = error.error.error;
      }
    }
    return throwError(() => new Error(errorMsg));
  }
}
