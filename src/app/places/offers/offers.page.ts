import { Component, OnInit } from '@angular/core';
import { Places } from '../places.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
  private places: Places[] = [];

  constructor(private _placesService: PlacesService) { }

  ngOnInit() {
    this.ionViewWillEnter();
  }

  ionViewWillEnter() {
    this.places = this._placesService.getPlaces();

  }
}
