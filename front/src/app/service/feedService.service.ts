import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
import { InteractionService } from './interactionService.service';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  private http = inject(HttpClient);

  private API_URL = 'http://localhost:8080/api/v1/feed/refresh';
  private API_URL_SCROLL = 'http://localhost:8080/api/v1/feed/scroll'
  private API_URL_Favorites = "http://localhost:8080/api/v1/bookmarks";
  private API_URL_Favorites_List = "http://localhost:8080/api/v1/bookmarks/list";
  private API_URL_Sub = "http://localhost:8080/api/v1/subscriptions";
  private API_URL_Sub_List = "http://localhost:8080/api/v1/subscriptions/list";

  private selectedNew: Article | null = null;

   private errorHttpService = inject(ErrorHttpService);

  getFeed(category?: string): Observable<Feed> {
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
      category: category,
      page:0,
      size:10
    };

    return this.http.post<Feed>(this.API_URL, body).pipe(catchError((err) => this.errorHttpService.handleError(err)));;
  }

  getScroll(category?: string, page:number = 0){
    if (typeof localStorage === 'undefined') {
      return throwError(() => new Error('No hay sesión'));
    }
    const email = localStorage.getItem('email');
    const pass = localStorage.getItem('password');
    console.log('getScroll body:', { email, pass, category, page });
    const body = {
      loginRequest: {
        email: email,
        password: pass,
      },
      category: category,
      pageNo:page,
      pageSize:4
    };
    return this.http.post<Feed>(this.API_URL_SCROLL, body).pipe(catchError((err) => this.errorHttpService.handleError(err)));;
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

}
