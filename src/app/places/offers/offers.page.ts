import { Component, OnInit, OnDestroy } from '@angular/core';
import { Places } from '../places.model';
import { PlacesService } from '../places.service';
import { Router } from '@angular/router';
import { IonItemSliding } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit, OnDestroy {
  private places: Places[] = [];
  private placesSub: Subscription
  constructor (private _placesService: PlacesService,
    private _router: Router) { }


  ngOnInit() {
    // this.ionViewWillEnter();
    this.placesSub = this._placesService.places.subscribe(places => {
      this.places = places;
    });
  }
  ngOnDestroy(): void {
    if (this.placesSub) {
      this.placesSub.unsubscribe()
    }
  }

  // ionViewWillEnter() {
  //   this.places = this._placesService.getPlaces();
  // }
  onEdit(offerId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this._router.navigate(['/places/tab/offers/edit', offerId]);
    console.log('Editing item', offerId);
  }
}
