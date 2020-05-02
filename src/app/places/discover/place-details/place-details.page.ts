import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, ModalController, ActionSheetController, LoadingController } from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Places } from '../../places.model';
import { CreateBookingComponent } from 'src/app/bookings/create-booking/create-booking.component';
import { Subscription } from 'rxjs';
import { BookingService } from 'src/app/bookings/booking.service';
import { Bookings } from 'src/app/bookings/booking-model';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.page.html',
  styleUrls: ['./place-details.page.scss'],
})
export class PlaceDetailsPage implements OnInit, OnDestroy {

  place: Places;
  placesSub: Subscription;
  isBook = false;

  constructor (private _navCtrl: NavController,
    private _activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    private _placeService: PlacesService,
    private _bookingService: BookingService,
    private _authService: AuthService,
    private _loadingCtrl: LoadingController,
    private actionSheetCtrl: ActionSheetController,
    private _router: Router) { }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(parmas => {
      const placeId: string = parmas.get('placeId');
      if (!placeId) {
        this._navCtrl.navigateBack('/places/tab/discover');
      } else {
        this.placesSub = this._placeService.getPlaceById(placeId).subscribe(place => {
          this.place = place;
          this.isBook = place.userID !== this._authService.UserId;
        });
      }
    })
  }

  ngOnDestroy(): void {
    if (this.placesSub) {
      this.placesSub.unsubscribe()
    }
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

  openBookingModal(mode: 'select' | 'random') {
    // this._navCtrl.navigateBack('/places/tab/discover');
    this.modalController.create({
      componentProps: { selectedPlace: this.place, selectedMode: mode },
      component: CreateBookingComponent
    })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then(resultData => {
        if (resultData.role === 'confirm') {
          this._loadingCtrl.create({ message: 'Booking places...' })
            .then(loadingEL => {
              loadingEL.present();
              const data = resultData.data.bookingData
              const bookings = new Bookings(
                Math.random().toString(),
                this.place.id,
                this.place.title,
                data.guestNumber,
                data.firstName,
                data.lastName,
                data.firstName,
                data.lastName,
                this._authService.UserId
              )
              this._bookingService.addBookings(bookings).subscribe(res => {
                loadingEL.dismiss();
              });
              this._router.navigate(['/bookings'])
            })

        }
      })
  }


}
