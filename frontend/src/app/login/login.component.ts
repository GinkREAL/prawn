import { Component, OnInit } from '@angular/core';
import { Login } from '../login';
import { AuthService } from '../services/auth.service.js';
import { Router } from '@angular/router';

class TokenResponse {
  token: string;
}
class SessionResponse {
  username: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public status: boolean;
  public credentials: any;

	login: Login = {
  	id: 1,
    name: 'login',
  }

  constructor(private authService: AuthService, private router: Router) {
    this['credentials'] = {
      username: '',
      password: ''
    }
  }

  loginFunc(creds) {
    this.authService.getToken(creds.username, creds.password).subscribe((object: TokenResponse) => {
        window.localStorage.setItem('token', object.token);
        this.authService.getSession().subscribe((object: SessionResponse) => {
          window.localStorage.setItem('username', object.username)
          this['status'] = true
          this.router.navigate(['/', 'labeling'])
        })
    }, error => {
      console.log("Err")
      this['status'] = false
    })
  }
  
  ngOnInit() {
  }
}
