import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private _navCtrl: NavController,
    private _activatedRoute: ActivatedRoute,
    private _authServices: AuthService) { }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    if (!this._authServices.getUserAuth()) {
      return this._navCtrl.navigateBack('/auth');
    } else {
      return this._authServices.getUserAuth();
    }
  }
}
