import { Component, OnInit } from '@angular/core';
import { Login } from '../login';
import { AuthService } from '../services/auth.service.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	login: Login = {
  	id: 1,
    name: 'login'
  }

  constructor(private authService: AuthService) {
    this.credentials = {
      username: '',
      password: ''
    }
  }

  loginFunc(creds) {
    this.authService.getToken(creds.username, creds.password)
  }
  
  ngOnInit() {
  }
}
