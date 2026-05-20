import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Article } from "../interfaces/article.interface";
import { Feed } from "../interfaces/feed.interface";



@Injectable({
  providedIn: 'root'
})

export class FeedServive{
  private http = inject(HttpClient)

  getFeed(){
    return this.http.get<Feed>('/api/feed.json')
  }

  getFeedByCategory(category: string){
    return this.http.get<Article[]>(`/api/feed?category=${category}`)
  }
}
