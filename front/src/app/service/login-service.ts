import { Injectable } from '@angular/core';
import { LoginInterface } from '../interfaces/loginInterface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError, BehaviorSubject, tap } from 'rxjs';
import { UserInterface } from '../interfaces/userInterface';
import { RegisterInterface } from '../interfaces/register.interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  //BehaviorSubject ALMACENA VALORES
  //Subscription ESCUCHA VALORES CAMBIAODS
  //Observable ENTREGA VALORES

  // Variables globales (gracias al getter) que todos pueden ver y cambiar
  private currentUserLoginOn = new BehaviorSubject<boolean>(false);
  private currentUserData = new BehaviorSubject<UserInterface>({userId: 0, username: '', dailyAiLimit: 0});

  private API_URL = 'http://localhost:8080/api/auth/login';

  // @Inject saber si es navegador o servidor, para que no pete
  constructor(private http: HttpClient) {
    this.loadSession();
  }

  login(credentials: LoginInterface): Observable<UserInterface> {
    return this.http.post<UserInterface>(this.API_URL, credentials).pipe( //<>  lo que espero
      // tap trata datos sin modificar, encapsulamiento
      // userData nombre de una variable que almacena lo que devuelve http
      tap(userData => {
        this.currentUserData.next(userData);
        this.currentUserLoginOn.next(true);

        // Serializa un array de string
        localStorage.setItem('auth', JSON.stringify({user: userData, logged: true}));   
        localStorage.setItem('email', credentials.email);
        localStorage.setItem('password', credentials.password); 
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

  // Gatillo subscripciones
  get userData(): Observable<UserInterface> {
    return this.currentUserData.asObservable();
  }
  get userLoginOn(): Observable<boolean> {
    return this.currentUserLoginOn.asObservable();
  }

  private loadSession(): void {
    if (typeof localStorage === 'undefined') return;
    const auth = localStorage.getItem('auth');
    if (auth) {
      const parsed = JSON.parse(auth);
      if (parsed.logged) {
        // Next avisa de las subscripciones
        this.currentUserData.next(parsed.user);
        this.currentUserLoginOn.next(true);
      }
    }
  }

  logout(): void {
    this.currentUserLoginOn.next(false);
    this.currentUserData.next({userId: 0, username: '', dailyAiLimit: 0});

    localStorage.removeItem('auth');
    localStorage.removeItem('email');
    localStorage.removeItem('password');
  }

  keepSession(userData: UserInterface, formData: RegisterInterface): void {
    this.currentUserData.next(userData);
    this.currentUserLoginOn.next(true);

    localStorage.setItem('auth', JSON.stringify({user: userData, logged: true}));   
    localStorage.setItem('email', formData.email);
    localStorage.setItem('password', formData.password); 
  }
}
