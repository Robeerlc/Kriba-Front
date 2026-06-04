import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
<<<<<<< Updated upstream
import { throwError} from 'rxjs';
=======
import { throwError } from 'rxjs';
>>>>>>> Stashed changes

@Injectable({
  providedIn: 'root'
})
export class ErrorHttpService {
<<<<<<< Updated upstream
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
=======
  public handleError(error: HttpErrorResponse) {
    let errorMessage = 'Algo falló, inténtelo de nuevo';
    
    if (error.status === 0) {
      console.error('Error de red:', error.error);
      errorMessage = 'No se pudo conectar con el servidor. Revisa tu conexión.';
    } else {
      console.error('Error de back:', error.status, error.error);
        //Comprueba si tienen las propiedades que quiero del JSON
        if (error.error?.message) {
            errorMessage = error.error.message;
        } else if (error.error?.error) {
            errorMessage = error.error.error;
        }
    }
    return throwError(() => new Error(errorMessage));
  }
>>>>>>> Stashed changes
}