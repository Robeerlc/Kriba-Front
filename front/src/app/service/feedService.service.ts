<<<<<<< Updated upstream
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
=======
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
>>>>>>> Stashed changes
import { inject, Injectable, Input } from '@angular/core';
import { Feed } from '../interfaces/feed.interface';
import { catchError, Observable, throwError } from 'rxjs';
import { Article } from '../interfaces/article.interface';
import { Favorite } from '../interfaces/favorite.interface';
import { LoginInterface } from '../interfaces/loginInterface';
import { favoriteArticle } from '../interfaces/favoriteArticle.interface';
import { Subscribe } from '../interfaces/subscribe.interface';
import { SubscriptionResponse } from '../interfaces/subscriptionList.interface';
import { ErrorHttpService } from './errorHttpService.service';
<<<<<<< Updated upstream
import { InteractionService } from './interactionService.service';
 
=======
import { CancelFavoriteI } from '../interfaces/cancelFavorite.interface';

>>>>>>> Stashed changes
@Injectable({
  providedIn: 'root',
})
export class FeedService {
  private http = inject(HttpClient);
<<<<<<< Updated upstream

  private API_URL = 'http://localhost:8080/api/v1/feed';
  private API_URL_Favorites = "http://localhost:8080/api/v1/bookmarks";
  private API_URL_Favorites_List = "http://localhost:8080/api/v1/bookmarks/list";
  private API_URL_Sub = "http://localhost:8080/api/v1/subscriptions";
  private API_URL_Sub_List = "http://localhost:8080/api/v1/subscriptions/list";
=======
  private API_URL_Favorites = "https://kriba-d08ba5-193-70-44-51.sslip.io/api/v1/bookmarks";
  private API_URL_Favorites_List = "https://kriba-d08ba5-193-70-44-51.sslip.io/api/v1/bookmarks/list";
  private API_URL_CancelFavorites = "https://kriba-d08ba5-193-70-44-51.sslip.io/api/v1/bookmarks/unsave";
  private API_URL_Sub = "https://kriba-d08ba5-193-70-44-51.sslip.io/api/v1/subscriptions";
  private API_URL_Sub_List = "https://kriba-d08ba5-193-70-44-51.sslip.io/api/v1/subscriptions/list";
  private API_URL_Sub_Cancel = "https://kriba-d08ba5-193-70-44-51.sslip.io/api/v1/subscriptions/unsubscribe";
  private API_URL = 'https://kriba-d08ba5-193-70-44-51.sslip.io/api/v1/feed'
>>>>>>> Stashed changes

  private selectedNew: Article | null = null;

   private errorHttpService = inject(ErrorHttpService);
<<<<<<< Updated upstream
   /*private interactionService = inject(InteractionService);
  @Input()article:any;*/
    

  getFeed(category?: string): Observable<Feed> {
=======

    getFeed(category?: string): Observable<Feed> {
>>>>>>> Stashed changes
    if (typeof localStorage === 'undefined') {
      return throwError(() => new Error('No hay sesión'));
    }
    const email = localStorage.getItem('email');
    const pass = localStorage.getItem('password');
    const body = {
      loginRequest: {
        email: email,
        password: pass,
      },
<<<<<<< Updated upstream
      category: category,
    };

    return this.http.post<Feed>(this.API_URL, body).pipe(catchError((err) => this.errorHttpService.handleError(err)));;
=======
      category: category
    };

    return this.http.post<Feed>(`${this.API_URL}?page=0`, body).pipe(catchError((err) => this.errorHttpService.handleError(err)));;
  }

    getScroll(category?: string, page: number = 0): Observable<Feed> {
    if (typeof localStorage === 'undefined') {
      return throwError(() => new Error('No hay sesión'));
    }
    const email = localStorage.getItem('email');
    const pass = localStorage.getItem('password');
    const body = {
      loginRequest: { email, password: pass },
      category: category,
    };

    return this.http.post<Feed>(`${this.API_URL}?page=${page}&size=10`, body)
      .pipe(catchError((err) => this.errorHttpService.handleError(err)));
>>>>>>> Stashed changes
  }

  setArticle(article: Article) {
    this.selectedNew = article;
  }

  getArticle(): Article | null {
    return this.selectedNew;
  }

  favorite(favoritePayload: Favorite): Observable<void>{
    return this.http.post<void>(this.API_URL_Favorites, favoritePayload)
    .pipe(catchError((err) => this.errorHttpService.handleError(err)));;
  }

  favoriteList(user: LoginInterface): Observable<favoriteArticle[]> {
    return this.http.post<any>(this.API_URL_Favorites_List, user)
    .pipe(catchError((err) => this.errorHttpService.handleError(err)));;
  }

  subscribe(subscribe: Subscribe): Observable<void>{
    return this.http.post<void>(this.API_URL_Sub, subscribe)
    .pipe(catchError((err) => this.errorHttpService.handleError(err)));;
  }

  subscriptionList(user: LoginInterface): Observable<SubscriptionResponse> {
    return this.http.post<SubscriptionResponse>(this.API_URL_Sub_List, user)
    .pipe(catchError((err) => this.errorHttpService.handleError(err)));
  }

<<<<<<< Updated upstream
}
 
=======
  cancelSubscribe(subscribe: Subscribe): Observable<void>{
    return this.http.post<void>(this.API_URL_Sub_Cancel, subscribe)
    .pipe(catchError((err) => this.errorHttpService.handleError(err)));;
  }

  cancelFavorite(cancelFavoriteI: CancelFavoriteI): Observable<void>{
    return this.http.post<void>(this.API_URL_CancelFavorites, cancelFavoriteI)
    .pipe(catchError((err) => this.errorHttpService.handleError(err)));;
  }

}
>>>>>>> Stashed changes
