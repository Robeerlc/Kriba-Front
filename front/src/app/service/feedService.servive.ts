import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Article } from "../interfaces/article.interface";
import { Feed } from "../interfaces/feed.interface";
import { catchError, Observable, throwError } from "rxjs";



@Injectable({
  providedIn: 'root'
})

export class FeedService{
  private http = inject(HttpClient)

    private API_URL = 'http://localhost:8080/api/v1/feed';


  getFeed(category?: string): Observable<Feed>{

       if (typeof localStorage === 'undefined') {
        return throwError(() => new Error('No hay sesión'));
    }
    const email = localStorage.getItem('email');
    const pass = localStorage.getItem('password');
    const body = {
      loginRequest:{
        email:email,
        password: pass
      },
      category: category
    }

    return this.http.post<Feed>(this.API_URL,body).pipe(
    catchError(this.handleError)
);
  }

 getFeedByCategory(category: string): Observable<Feed> {
    if (typeof localStorage === 'undefined') {
        return throwError(() => new Error('No hay sesión'));
    }
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');
    const body = {
        loginRequest: { email : email, password:password },
        category: category
    };
    return this.http.post<Feed>(this.API_URL, body).pipe(
        catchError(this.handleError)
    );
}

      private handleError(error:HttpErrorResponse){
        let errorMsg = "Algo insesperado ocurrio"
        if(error.status===0){
          console.error('Error de red' + error.error)
        }else{
           console.error('Error de back:', error.status, error.error);
                if (error.error?.error) {
                  errorMsg = error.error.error;
                }
              }
              return throwError(() => new Error(errorMsg));
            }
}
