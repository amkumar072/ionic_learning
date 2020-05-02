import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take, map, tap, delay, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';

interface SignUpResponse {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isUserAuthenticated = false;
  private userId = null;

  constructor (
    private _http: HttpClient
  ) { }

  get UserId() {
    return this.userId;
  }

  getUserAuth() {
    return this.isUserAuthenticated;
  }
  signUp(email: string, password: string) {
    return this._http.post<SignUpResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseApiKEY}`,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      take(1),
      tap(res => {
        return res;
      })
    )
  }

  login() {
    this.isUserAuthenticated = true;
  }
  logout() {
    this.isUserAuthenticated = false;
  }
}
