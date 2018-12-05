import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginUrl = "/api/login";
  sessionUrl = "/api/user";

  constructor(
    private http: HttpClient
  ) { }

  getToken(username, password) {
    let body = new FormData();
    body.append('username',username);
    body.append('password',password);
    return this.http.post(this.loginUrl,body)
  }

  getSession() {
    return this.http.get(this.sessionUrl)
  }

  signup(username, password){
    let body = new FormData();
    body.append("username", username)
    body.append("password", password)
    return this.http.post(this.sessionUrl, body)
  }

  logout(){
    window.localStorage.removeItem('username');
    window.localStorage.removeItem('token');
  }


}
