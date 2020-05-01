import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from '../../places.service';
import { Places } from '../../places.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-place-bookings',
  templateUrl: './place-bookings.page.html',
  styleUrls: ['./place-bookings.page.scss'],
})
export class PlaceBookingsPage implements OnInit, OnDestroy {

  place: Places;
  placesSub: Subscription
  constructor (private _navCtrl: NavController,
    private _activatedRoute: ActivatedRoute,
    private _placesService: PlacesService) { }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(param => {
      if (!param.get('placeId')) {
        this._navCtrl.navigateBack('/places/tab/offers');
      } else {
        this.placesSub = this._placesService.getPlaceById(param.get('placeId'))
          .subscribe(place => {
            this.place = place;
          });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.placesSub) {
      this.placesSub.unsubscribe()
    }
  }

}
