import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isUserAuthenticated = true;

  constructor () { }

  getUserAuth() {
    return this.isUserAuthenticated;
  }

  login() {
    this.isUserAuthenticated = true;
  }
  logout() {
    this.isUserAuthenticated = false;
  }
}
