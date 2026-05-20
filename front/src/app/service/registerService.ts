import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterInterface } from '../interfaces/register.interface';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { UserInterface } from '../interfaces/userInterface';
import { LoginService } from './login-service';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {

  private API_URL = 'http://localhost:8080/api/auth/register';

  constructor(private http:HttpClient, private loginService:LoginService){}

  register(formData: RegisterInterface): Observable<UserInterface> {
    return this.http.post<UserInterface>(this.API_URL, formData).pipe(
      tap((userData) => {
            console.log("El usuario se ha registrado correctamente (logica)", +userData);
            this.loginService.keepSession(userData, formData);
          }),
          catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse) {
      let errorMessage = 'Algo falló, inténtelo de nuevo';
      if (error.status === 0) {
        console.error('Error de red:', error.error);
      } else {
        console.error('Error de back:', error.status, error.error);
        if (error.error?.error) {
          errorMessage = error.error.error;
        }
      }
      return throwError(() => new Error(errorMessage));
    }

}
