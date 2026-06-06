import { Injectable } from '@angular/core';
import { LoginInterface } from '../interfaces/loginInterface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError, BehaviorSubject, tap } from 'rxjs';
import { UserInterface } from '../interfaces/userInterface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  currentUserLoginOn: BehaviorSubject<boolean>;
  currentUserData: BehaviorSubject<UserInterface>;

  constructor(private http: HttpClient) {
    const isBrowser = typeof window !== 'undefined';

    // CAMBIO: Usamos localStorage en lugar de sessionStorage
    const storedLogin = isBrowser ? localStorage.getItem('isLoggedIn') === 'true' : false;
    const storedUser = isBrowser ? localStorage.getItem('userData') : null;

    const initialUserData = storedUser ? JSON.parse(storedUser) : { id: 0, email: '' };

    this.currentUserLoginOn = new BehaviorSubject<boolean>(storedLogin);
    this.currentUserData = new BehaviorSubject<UserInterface>(initialUserData);
  }

  login(credentials: LoginInterface): Observable<UserInterface> {
    return this.http.get<UserInterface>('./data.json').pipe(
      tap(userData => {
        if (typeof window !== 'undefined') {
          // CAMBIO: Guardamos en localStorage
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userData', JSON.stringify(userData));
        }

        this.currentUserData.next(userData);
        this.currentUserLoginOn.next(true);
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status == 0) {
      console.error('Se ha producido un error' + error.error);
    } else {
      console.error('Backend retorno el codigo de estado ', error.status, error.error);
    }
    return throwError(() => new Error('Algo fallo intentelo de nuevo'));
  }

  get userData(): Observable<UserInterface> {
    return this.currentUserData.asObservable();
  }

  get userLoginOn(): Observable<boolean> {
    return this.currentUserLoginOn.asObservable();
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      // CAMBIO: Borramos de localStorage
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userData');
    }

    this.currentUserLoginOn.next(false);
    this.currentUserData.next({ id: 0, email: '' });
  }
}