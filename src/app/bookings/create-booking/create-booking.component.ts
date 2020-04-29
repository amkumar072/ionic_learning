import { Component, OnInit, Input } from '@angular/core';
import { Places } from 'src/app/places/places.model';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  @Input() selectedPlace: Places;

  constructor(private _modalCtrl: ModalController) { }

  ngOnInit() { }
  onCancel() {
    this._modalCtrl.dismiss(null, 'cancel');
  }

  onBookPlace() {
    this._modalCtrl.dismiss({ message: 'Boooked place' }, 'confirm');

  }
}
