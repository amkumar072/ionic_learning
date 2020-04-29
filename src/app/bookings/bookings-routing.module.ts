import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookingsPage } from './bookings.page';

const routes: Routes = [
  {
    path: '',
    component: BookingsPage,
    children: [
      {
        path: 'book',
        loadChildren: () => import('./bookings.module').then(m => m.BookingsPageModule)
      }, {
        path: 'create',
        loadChildren: () => import('./create-booking/create-booking.component').then(m => m.CreateBookingComponent)

      }
    ]
  },
  {
    path: '',
    redirectTo: '/bookings/book',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingsPageRoutingModule { }
