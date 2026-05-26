import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHttpService {
    public handleError(error: HttpErrorResponse) {
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