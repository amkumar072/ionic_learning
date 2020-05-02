import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlacesService } from '../places.service';
import { Places } from '../places.model';
import { Subscription } from 'rxjs';
import { MenuController } from '@ionic/angular';
import { SegmentChangeEventDetail } from '@ionic/core';
import { AuthService } from 'src/app/auth/auth.service';
import { take, map, tap, delay } from 'rxjs/operators';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {

  loadedPlaces: Places[] = [];
  private localPlaces: Places[] = [];
  private filter = 'all';
  private placesSub: Subscription;

  constructor (private _placesService: PlacesService,
    private _authService: AuthService,
    private menuCtrl: MenuController) { }

  ngOnInit() {
    this.placesSub = this._placesService.places.subscribe(places => {
      this.localPlaces = places;
      this.loadedPlaces = this.localPlaces;
      this.onFilterUpdate(this.filter);
    });
  }

  ngOnDestroy(): void {
    if (this.placesSub) {
      this.placesSub.unsubscribe()
    }
  }

  onOpenMenu() {
    this.menuCtrl.toggle();
  }

  onFilterUpdate(filter: string) {
    // console.log(event.detail);
    // if (event.detail.value == 'all') {
    //   this.loadedPlaces = this.localPlaces;
    // } else {
    //   this.loadedPlaces = this.localPlaces.filter(x => {
    //      return x.userID !== this._authService.getUserId();
    //   })
    // }
    const isShown = place => filter === 'all' || place.userID !== this._authService.UserId;
    this.loadedPlaces = this.localPlaces.filter(isShown);
    this.filter = filter;
  }

}
