import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LabelService {

  commentUrl = "/api/comment"
  labelUrl = "/api/label"

  constructor(
    private http: HttpClient
  ) { }

  getComment(article_id, comment_address) {
    let headerz = new HttpHeaders({
      "article_id": article_id,
      "comment_address": comment_address
    })
    return this.http.get(this.commentUrl, {headers: headerz})
  }

  postLabel(article_id, comment_address, label){
    let body = new FormData();
    body.append("article_id", article_id);
    body.append("comment_address", comment_address)
    body.append("label", label)
    return this.http.post(this.labelUrl, body);
  }

}
