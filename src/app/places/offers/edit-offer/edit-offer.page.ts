import { Component, OnInit, OnDestroy } from '@angular/core';
import { Places } from '../../places.model';
import { NavController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { PlacesService } from '../../places.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit, OnDestroy {

  place: Places;
  form: FormGroup;
  placesSub: Subscription;
  constructor (private _navCtrl: NavController,
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService,
    private _loadingCtrl: LoadingController,
    private _router: Router,
    private _placesService: PlacesService) { }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(param => {
      if (!param.get('placeId')) {
        this._navCtrl.navigateBack('/places/tab/offers');
      } else {
        this.placesSub = this._placesService.getPlaceById(param.get('placeId')).subscribe(place => {
          this.place = place;
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
        });

      }
    });
  }

  ngOnDestroy(): void {
    if (this.placesSub) {
      this.placesSub.unsubscribe()
    }
  }

  onUpdateOffer() {
    if (!this.form.valid) {
      return;
    }
    this._loadingCtrl.create({
      message: 'Updating offer...'
    }).then(elementPl => {
      elementPl.present();
      const places = new Places(
        this.place.id,
        this.form.value.title,
        this.form.value.description,
        this.place.imageURL,
        +this.form.value.price,
        this.place.availableFrom,
        this.place.availabeleto,
        this._authService.UserId,
      )
      this._placesService.updatePlace(places).subscribe(places => {
        elementPl.dismiss();
      });
      this._router.navigate(['/places/tab/offers'])
    })

  }

}
