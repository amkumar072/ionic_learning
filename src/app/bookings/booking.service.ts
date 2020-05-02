import { Injectable } from '@angular/core';
import { Bookings } from './booking-model';
import { BehaviorSubject } from 'rxjs';
import { delay, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private _booking = new BehaviorSubject<Bookings[]>([
    new Bookings('1',
      'test',
      'teset',
      2,
      'test',
      'test',
      new Date('10/2/2019'),
      new Date('11/4/2020'),
      'xyx')
  ]);

  constructor () { }

  get bookings() {
    return this._booking.asObservable();
  }

  addBookings(book: Bookings) {
    console.log(book);

    return this._booking.pipe(
      take(1),
      delay(1000),
      tap(booking => {
        this._booking.next(booking.concat(book));
      })
    )
  }

  cancelBookings(bookingId) {
    return this._booking.pipe(
      take(1),
      delay(1000),
      tap(booking => {
        this._booking.next(booking.filter(x => x.id !== bookingId));
      })
    )
  }
}
