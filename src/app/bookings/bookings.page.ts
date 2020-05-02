import { Component, OnInit, OnDestroy } from '@angular/core';
import { Bookings } from './booking-model';
import { BookingService } from './booking.service';
import { Subscription } from 'rxjs';
import { IonItemSliding, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit, OnDestroy {

  loadingBookings: Bookings[];
  bookingsSub: Subscription;
  constructor (private _bookingService: BookingService,
    private _loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.bookingsSub = this._bookingService.bookings.subscribe(bookingsLocal => {
      this.loadingBookings = bookingsLocal;
    })
  }

  ngOnDestroy() {
    if (this.bookingsSub) {
      this.bookingsSub.unsubscribe();
    }
  }

  onCancelBooking(bookingId: string, slidingEl: IonItemSliding) {
    slidingEl.close();
    this._loadingCtrl.create({ message: 'Cancelling...' })
      .then(loadingEL => {
        loadingEL.present();
        this._bookingService.cancelBookings(bookingId).subscribe(
          () => {
            loadingEL.dismiss();
          })
      });

  }

}
