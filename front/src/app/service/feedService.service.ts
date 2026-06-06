import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core'; // <-- Inyectamos PLATFORM_ID
import { isPlatformBrowser } from '@angular/common'; // <-- Importamos isPlatformBrowser
import { Feed } from '../interfaces/feed.interface';
import { catchError, Observable, Subject, throwError, of } from 'rxjs'; // <-- Añadido 'of'
import { Article } from '../interfaces/article.interface';
import { Favorite } from '../interfaces/favorite.interface';
import { LoginInterface } from '../interfaces/loginInterface';
import { favoriteArticle } from '../interfaces/favoriteArticle.interface';
import { Subscribe } from '../interfaces/subscribe.interface';
import { SubscriptionResponse } from '../interfaces/subscriptionList.interface';
import { ErrorHttpService } from './errorHttpService.service';
import { CancelFavoriteI } from '../interfaces/cancelFavorite.interface';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID); // <-- Descubrir si es Servidor o Navegador
  private errorHttpService = inject(ErrorHttpService);

  private API_URL_Favorites = 'https://kriba-d08ba5-193-70-44-51.sslip.io/api/v1/bookmarks';
  private API_URL_Favorites_List = 'https://kriba-d08ba5-193-70-44-51.sslip.io/api/v1/bookmarks/list';
  private API_URL_CancelFavorites = 'https://kriba-d08ba5-193-70-44-51.sslip.io/api/v1/bookmarks/unsave';
  private API_URL_Sub = 'https://kriba-d08ba5-193-70-44-51.sslip.io/api/v1/subscriptions';
  private API_URL_Sub_List = 'https://kriba-d08ba5-193-70-44-51.sslip.io/api/v1/subscriptions/list';
  private API_URL_Sub_Cancel = 'https://kriba-d08ba5-193-70-44-51.sslip.io/api/v1/subscriptions/unsubscribe';
  private API_URL = 'https://kriba-d08ba5-193-70-44-51.sslip.io/api/v1/feed';

  private selectedNew: Article | null = null;
  favoriteRemoved$ = new Subject<string>();
  subscriptionCancelled$ = new Subject<string>();

  getFeed(category?: string): Observable<Feed> {
    // PROTECCIÓN SSR: Si se ejecuta en el servidor, devolvemos un cascarón vacío simulado
    if (!isPlatformBrowser(this.platformId)) {
      return of({ articles: [], totalPages: 0, totalElements: 0 } as unknown as Feed);
    }

    const email = localStorage.getItem('email');
    const pass = localStorage.getItem('password');

    // Si de verdad estamos en el navegador y no hay credenciales, entonces sí es un error real
    if (!email || !pass) {
      return throwError(() => new Error('No hay sesión activa en el almacenamiento'));
    }

    const body = {
      loginRequest: {
        email: email,
        password: pass,
      },
      category: category,
    };

    return this.http
      .post<Feed>(`${this.API_URL}?page=0`, body)
      .pipe(catchError((err) => this.errorHttpService.handleError(err)));
  }

  getScroll(category?: string, page: number = 0): Observable<Feed> {
    // PROTECCIÓN SSR: Evitamos peticiones HTTP colgadas en el servidor
    if (!isPlatformBrowser(this.platformId)) {
      return of({ articles: [], totalPages: 0, totalElements: 0 } as unknown as Feed);
    }

    const email = localStorage.getItem('email');
    const pass = localStorage.getItem('password');

    if (!email || !pass) {
      return throwError(() => new Error('No hay sesión activa en el almacenamiento'));
    }

    const body = {
      loginRequest: { email, password: pass },
      category: category,
    };

    return this.http
      .post<Feed>(`${this.API_URL}?page=${page}&size=10`, body)
      .pipe(catchError((err) => this.errorHttpService.handleError(err)));
  }

  setArticle(article: Article) {
    this.selectedNew = article;
  }

  getArticle(): Article | null {
    return this.selectedNew;
  }

  favorite(favoritePayload: Favorite): Observable<void> {
    if (!isPlatformBrowser(this.platformId)) return of(void 0);
    return this.http
      .post<void>(this.API_URL_Favorites, favoritePayload)
      .pipe(catchError((err) => this.errorHttpService.handleError(err)));
  }

  favoriteList(user: LoginInterface): Observable<favoriteArticle[]> {
    if (!isPlatformBrowser(this.platformId)) return of([]);
    return this.http
      .post<any>(this.API_URL_Favorites_List, user)
      .pipe(catchError((err) => this.errorHttpService.handleError(err)));
  }

  subscribe(subscribe: Subscribe): Observable<void> {
    if (!isPlatformBrowser(this.platformId)) return of(void 0);
    return this.http
      .post<void>(this.API_URL_Sub, subscribe)
      .pipe(catchError((err) => this.errorHttpService.handleError(err)));
  }

  subscriptionList(user: LoginInterface): Observable<SubscriptionResponse> {
    if (!isPlatformBrowser(this.platformId)) return of({} as SubscriptionResponse);
    return this.http
      .post<SubscriptionResponse>(this.API_URL_Sub_List, user)
      .pipe(catchError((err) => this.errorHttpService.handleError(err)));
  }

  cancelSubscribe(subscribe: Subscribe): Observable<void> {
    if (!isPlatformBrowser(this.platformId)) return of(void 0);
    return this.http
      .post<void>(this.API_URL_Sub_Cancel, subscribe)
      .pipe(catchError((err) => this.errorHttpService.handleError(err)));
  }

  cancelFavorite(cancelFavoriteI: CancelFavoriteI): Observable<void> {
    if (!isPlatformBrowser(this.platformId)) return of(void 0);
    return this.http
      .post<void>(this.API_URL_CancelFavorites, cancelFavoriteI)
      .pipe(catchError((err) => this.errorHttpService.handleError(err)));
  }
}