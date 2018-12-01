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
    const formData = new FormData();
    formData.append('username','admin');
    formData.append('password','superpassword');
    this.http.post(this.loginUrl,formData).subscribe(object => {
        window.localStorage.setItem('token', object.token);
    })
  }

  getSession() {
    return this.http.get(this.sessionUrl)
  }

  signup(username, password){
    let body = {
      "username": username,
      "password": password
    }
    return this.http.post(this.loginUrl, body)
  }


}
