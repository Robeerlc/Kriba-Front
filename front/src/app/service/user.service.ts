import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditComponent } from '../components/shared/editComponent/editComponent';
import { catchError, Observable, throwError } from 'rxjs';
import { UserInterface } from '../interfaces/user.Interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private Api_Url = 'https://kriba-d08ba5-193-70-44-51.sslip.io/api/v1/auth/update';
  private API_URL_DELETE = 'https://kriba-d08ba5-193-70-44-51.sslip.io/api/v1/auth/delete'
  private readonly dialog = inject(MatDialog);

  modifyData(userName: string, userEmail: string, password: string): Observable<UserInterface> {
    if (typeof localStorage == 'undefined') {
      return throwError(() => new Error('No hay sesion'));
    }

    const auth = JSON.parse(localStorage.getItem('auth') ?? '{}');
    const actualUsername = auth?.user?.username;

    const currentEmail = localStorage.getItem('email');
    const currentPassword = localStorage.getItem('password');

    const body = {
      loginRequest: {
        email: currentEmail,
        password: currentPassword,
      },
      newUsername: userName || actualUsername,
      newEmail: userEmail || currentEmail,
      newPassword: password || currentPassword,
    };

    return this.http.post<UserInterface>(this.Api_Url, body).pipe(catchError(this.handleError));
  }

  openEditModel(): void {
    const auth = JSON.parse(localStorage.getItem('auth') ?? '{}');
    const actualUsername = auth?.user?.username;

    const currentEmail = localStorage.getItem('email');
    this.dialog.open(EditComponent, {
      width: '400px',
      maxWidth: '90vw',
      hasBackdrop: false,
      autoFocus: false,
      data: {
        username: actualUsername,
        userEmail: currentEmail,
      },
    });
  }

  closeModal() {
    this.dialog.closeAll();
  }


  deleteUser(){
    if (typeof localStorage === 'undefined') {
    return throwError(() => new Error('No hay sesion'));
  }
    const currentEmail = localStorage.getItem('email')
    const currentPassword = localStorage.getItem('password')

    const body = {
      email:currentEmail,
      password: currentPassword
    };

    return this.http.post(this.API_URL_DELETE, body).pipe(catchError(this.handleError))

  }

  private handleError(error: HttpErrorResponse) {
    let errorMsg = 'ALgo inesperado ha surgido';

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
