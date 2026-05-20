import { Injectable } from '@angular/core';
import { LoginInterface } from '../interfaces/loginInterface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError, BehaviorSubject, tap } from 'rxjs';
import { UserInterface } from '../interfaces/userInterface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
 //Que puede = lo que guarda
  currentUserLoginOn: BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<UserInterface>=new BehaviorSubject<UserInterface>({id:0, email:''});


  // CON SPRING
  // CAMBIAR LA URL Y PASARLE LAS CREDENCIALES
  // MIRAR SI DA ERROR CON CrossOrigin
  constructor(private http:HttpClient){}
                                    // Contenedor porque la respuesta es asincrona
  login(credentials:LoginInterface):Observable<UserInterface>{
    return this.http.get<UserInterface>('./data.json').pipe(
      // Codigo secundario sin modificar valor
      tap(userData=>{
        // next envia el nuevo valor
        this.currentUserData.next(userData);
        this.currentUserLoginOn.next(true);
      }),
      catchError(this.handleError)
    );
  }

  //200 ok
  //404 no encontro
  //500 error server
  //0 falla antes del server (URL)
  private handleError(error:HttpErrorResponse){
    if(error.status==0){
      console.error('Se ha producido un error'+error.error);
    }else{
      console.error('Backend retorno el codigo de estado ',error.status, error.error);
    }
    return throwError(()=>new Error('Algo fallo intentelo de nuevo'));
  }

  // Gettes encapsulamiento
  get userData():Observable<UserInterface>{
    return this.currentUserData.asObservable();
  }

  get userLoginOn():Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
  }

  logout(): void{
    this.currentUserLoginOn.next(false);
    this.currentUserData.next({ id: 0, email: '' });
  }
}
