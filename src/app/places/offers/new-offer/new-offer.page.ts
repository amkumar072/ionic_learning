import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlacesService } from '../../places.service';
import { Places } from '../../places.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { LoadingController } from '@ionic/angular';
import { element } from 'protractor';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {
  form: FormGroup;
  constructor (private _placesService: PlacesService,
    private _authService: AuthService,
    private _loadingCtrl: LoadingController,
    private _router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      description: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.minLength(8)]
      }),
      price: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(0)]
      }),
      dateFrom: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      dateTo: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    })
  }
  onCreateOffer() {
    if (!this.form.valid) {
      return;
    }
    this._loadingCtrl.create({
      message: 'Creating offer'
    }).then(elementPl => {
      elementPl.present();
      const places = new Places(
        Math.random().toString(),
        this.form.value.title,
        this.form.value.description,
        'https://media-cdn.tripadvisor.com/media/photo-s/0b/60/6a/53/night-view.jpg',
        +this.form.value.price,
        this.form.value.dateFrom,
        this.form.value.dateTo,
        this._authService.UserId,
      )
      this._placesService.addPlace(places).subscribe(places => {
        elementPl.dismiss();
      });
      this._router.navigate(['/places/tab/offers'])
    })

  }
}
