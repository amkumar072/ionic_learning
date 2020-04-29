import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from '../../places.service';
import { Places } from '../../places.model';

@Component({
  selector: 'app-place-bookings',
  templateUrl: './place-bookings.page.html',
  styleUrls: ['./place-bookings.page.scss'],
})
export class PlaceBookingsPage implements OnInit {

  place: Places;

  constructor(private _navCtrl: NavController,
    private _activatedRoute: ActivatedRoute,
    private _placesService: PlacesService) { }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(param => {
      if (!param.get('placeId')) {
        this._navCtrl.navigateBack('/places/tab/offers');
      } else {
        this.place = this._placesService.getPlaceById(param.get('placeId'));
      }
    });
  }

}
