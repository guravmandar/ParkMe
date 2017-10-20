import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './../services/login.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent {
  username: string;
  password: string;
  invalid_login: boolean;

  constructor(private router: Router, private LoginService: LoginService) {
   
    this.username = '';
    this.password = '';

    this.invalid_login = false;
    this.getUserCredentials();
  }

  getUserCredentials() {
    debugger;
    this.LoginService.getUserCredentials("","")
      .subscribe(queryResults => {

      });
  }
  onSubmit() {
    if (this.username == '' || this.password == '') {
      console.log("No username/password");
      return;
    }

    this.invalid_login = false;


  }

}
