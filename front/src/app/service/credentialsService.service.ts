import { Injectable } from '@angular/core';
import { LoginInterface } from '../interfaces/loginInterface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError, BehaviorSubject, tap } from 'rxjs';
import { UserInterface } from '../interfaces/user.Interface';
import { RegisterInterface } from '../interfaces/register.interface';
import { ErrorHttpService } from './errorHttpService.service';

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

<<<<<<< Updated upstream
  private API_URL = 'http://localhost:8080/api/v1/auth/login';
  private API_URL_2 = 'http://localhost:8080/api/v1/auth/register';
=======
  private API_URL = 'https://kriba-d08ba5-193-70-44-51.sslip.io/api/v1/auth/login';
  private API_URL_2 = 'https://kriba-d08ba5-193-70-44-51.sslip.io/api/v1/auth/register';
>>>>>>> Stashed changes

  // @Inject saber si es navegador o servidor, para que no pete
  constructor(private http: HttpClient, private errorHttpService:ErrorHttpService) {
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
<<<<<<< Updated upstream
        localStorage.setItem('auth', JSON.stringify({user: userData, logged: true}));   
        localStorage.setItem('email', credentials.email);
        localStorage.setItem('password', credentials.password); 
=======
        localStorage.setItem('auth', JSON.stringify({user: userData, logged: true}));
        localStorage.setItem('email', credentials.email);
        localStorage.setItem('password', credentials.password);
>>>>>>> Stashed changes
      }),
        catchError(err => this.errorHttpService.handleError(err))
    );
  }

  register(formData: RegisterInterface): Observable<UserInterface> {
<<<<<<< Updated upstream
    return this.http.post<UserInterface>(this.API_URL_2, formData).pipe( 
      tap((userData) => {
          console.log("El usuario se ha registrado correctamente (logica)", userData);
            this.keepSession(userData, formData);
=======
    return this.http.post<UserInterface>(this.API_URL_2, formData).pipe(
      tap((userData) => {
          console.log("El usuario se ha registrado correctamente (logica)", userData);
>>>>>>> Stashed changes
          }),
          catchError(err => this.errorHttpService.handleError(err))
        );
    }

  // Gatillo subscripciones login
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

<<<<<<< Updated upstream
  keepSession(userData: UserInterface, formData: RegisterInterface): void {
    this.currentUserData.next(userData);
    this.currentUserLoginOn.next(true);

    localStorage.setItem('auth', JSON.stringify({user: userData, logged: true}));   
    localStorage.setItem('email', formData.email);
    localStorage.setItem('password', formData.password); 
  }
=======

>>>>>>> Stashed changes
}
