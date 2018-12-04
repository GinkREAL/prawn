import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';


class TokenResponse {
  token: string;
}
class SessionResponse {
  username: string;
}

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
    this.http.post(this.loginUrl,body).subscribe((object: TokenResponse) => {
        window.localStorage.setItem('token', object.token);
    })
    this.getSession().subscribe((object: SessionResponse) => {
      window.localStorage.setItem('username', object.username);
    })
  }

  getSession() {
    return this.http.get(this.sessionUrl)
  }

  signup(username, password){
    console.log("asdfawefaewfwefw")
    let body = new FormData();
    body.append("username", username)
    body.append("password", password)
    return this.http.post(this.sessionUrl, body)
  }


}
