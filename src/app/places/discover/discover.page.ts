import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlacesService } from '../places.service';
import { Places } from '../places.model';
import { Subscription } from 'rxjs';
import { MenuController } from '@ionic/angular';
import { SegmentChangeEventDetail } from '@ionic/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {

  loadedPlaces: Places[] = [];
  private localPlaces: Places[] = [];
  private placesSub: Subscription
  constructor (private _placesService: PlacesService,
    private _authService: AuthService,
    private menuCtrl: MenuController) { }

  ngOnInit() {
    this.placesSub = this._placesService.places.subscribe(places => {
      this.localPlaces = places;
      this.loadedPlaces = this.localPlaces;
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

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    // console.log(event.detail);
    if (event.detail.value == 'all') {
      this.loadedPlaces = this.localPlaces;
    } else {
      this.loadedPlaces = this.localPlaces.filter(x => {
         return x.userID !== this._authService.getUserId();
      })
    }
  }

}
