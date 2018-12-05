import { Component, OnInit } from '@angular/core';
import { Signup } from '../signup';
import { AuthService } from '../services/auth.service.js';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

	signup: Signup = {
  	id: 3,
    name: 'signup'
  }

  constructor(private authService: AuthService) {
    this['newCredentials'] = {
      username: '',
      password: ''
    }
  }

  signupFunc(creds) {
  	this['newCredentials']['username'] = creds.username
  	this['newCredentials']['password'] = creds.password
  	console.log(this['newCredentials']['username'])
    this.authService.signup(this['newCredentials']['username'], this['newCredentials']['password']).subscribe()
  }

  ngOnInit() {

  }

}
