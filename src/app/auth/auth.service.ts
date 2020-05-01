import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isUserAuthenticated = true;
  private userId='abc';

  constructor () { }

  getUserId(){
    return this.userId;
  }

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
