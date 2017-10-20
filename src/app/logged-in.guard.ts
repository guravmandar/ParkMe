import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { LoginService } from './services/login.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private user: LoginService) {}

  canActivate() {
 
    return this.user.isLoggedIn();
  }
}
