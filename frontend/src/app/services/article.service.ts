import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  articleUrl = "/api/randomarticle";

  constructor(
    private http: HttpClient
  ) { }

  getRandomArticle() {
    return this.http.get(this.articleUrl);
  }

}
