import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, ActionSheetController } from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { ActivatedRoute } from '@angular/router';
import { Places } from '../../places.model';
import { CreateBookingComponent } from 'src/app/bookings/create-booking/create-booking.component';

@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.page.html',
  styleUrls: ['./place-details.page.scss'],
})
export class PlaceDetailsPage implements OnInit {

  place: Places;
  constructor(private _navCtrl: NavController,
    private _activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    private _placeServices: PlacesService,
    private actionSheetCtrl: ActionSheetController) { }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(parmas => {
      const placeId: string = parmas.get('placeId');
      if (!placeId) {
        this._navCtrl.navigateBack('/places/tab/discover');
      } else {
        this.place = this._placeServices.getPlaceById(placeId);
      }
    })
  }

  openBookingModal(mode: 'select' | 'random') {
    // this._navCtrl.navigateBack('/places/tab/discover');
    this.modalController.create({
      componentProps: { selectedPlace: this.place },
      component: CreateBookingComponent
    })
      .then(modal => {
        modal.present();
        return modal.onDidDismiss();
      })
      .then(x => {
        console.log(x.data, x.role);

        if (x.role === 'confirm') {
          console.log('Booked');

        }
      })
  }

  onBookPlace() {
    this.actionSheetCtrl
      .create({
        header: 'Choose an Action',
        buttons: [
          {
            text: 'Select Date',
            handler: () => {
              this.openBookingModal('select');
            }
          },
          {
            text: 'Random Date',
            handler: () => {
              this.openBookingModal('random');
            }
          },
          {
            text: 'Cancel',
            role: 'cancel'
          }
        ]
      })
      .then(actionSheetEl => {
        actionSheetEl.present();
      });
  }

}
