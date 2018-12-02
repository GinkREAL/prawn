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

  login(credentials) {
    this.authService.getToken(this.credentials.username, this.credentials.password).subscribe()
  }

  constructor(private authService: AuthService) {
    var ctrl = this
    var credentials = {
      username: '',
      password: ''
    }

  }

  
  ngOnInit() {
  }

  

}
