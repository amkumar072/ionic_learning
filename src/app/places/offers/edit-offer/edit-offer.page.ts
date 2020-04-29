import { Component, OnInit } from '@angular/core';
import { Places } from '../../places.model';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from '../../places.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {

  place: Places;
  form: FormGroup;

  constructor (private _navCtrl: NavController,
    private _activatedRoute: ActivatedRoute,
    private _placesService: PlacesService) { }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(param => {
      if (!param.get('placeId')) {
        this._navCtrl.navigateBack('/places/tab/offers');
      } else {
        this.place = this._placesService.getPlaceById(param.get('placeId'));
        this.form = new FormGroup({
          title: new FormControl(this.place.title, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          description: new FormControl(this.place.description, {
            updateOn: 'blur',
            validators: [Validators.required, Validators.minLength(18)]
          }),
          price: new FormControl(this.place.price, {
            updateOn: 'blur',
            validators: [Validators.required, Validators.min(0)]
          })
        })
      }
    });
  }

  onUpdateOffer() {
    if (!this.form.valid) {
      return;
    }
    console.log(this.form);

  }

}
