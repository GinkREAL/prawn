import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LabelService {

  commentUrl = "/api/comment"
  labelUrl = "/api/label"
  myLabelUrl = "/api/mylabels"
  article = "/api/article"

  constructor(
    private http: HttpClient
  ) { }

  getComment() {
    return this.http.get(this.commentUrl)
  }

  assignArticle() {
    return this.http.post(this.article)
  }

  postLabel(article_id, comment_address, label, target){
    let body = new FormData();
    body.append("article_id", article_id)
    body.append("comment_address", comment_address)
    body.append("label", label)
    body.append("target", target)
    return this.http.post(this.labelUrl, body);
  }

  getLabel(article_id, comment_address){
    let headerz = new HttpHeaders({
      "article_id": article_id,
      "comment_address": comment_address
    })
    return this.http.get(this.labelUrl, {headers: headerz})
  }

  getMyLabels(){
    return this.http.get(this.myLabelUrl)
  }

}
