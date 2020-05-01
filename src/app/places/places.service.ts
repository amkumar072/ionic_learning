import { Injectable } from '@angular/core';
import { Places } from './places.model';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places = new BehaviorSubject<Places[]>([
    new Places('p1', 'Agra', 'Taj Mahal',
      'https://static.toiimg.com/thumb/msid-31346158,width-748,height-499,resizemode=4,imgsize-114461/Agra.jpg',
      599.99,
      new Date('2020-01-01'),
      new Date('2020-12-01'),
      'xyz'),
    new Places('p2', 'Chennai', 'Marina Beach',
      'https://marinabeachclub.com/wp-content/uploads/2018/05/bg_atardecer_01.jpg',
      299.99,
      new Date('2020-01-01'),
      new Date('2020-12-01'),
      'abc'),
    new Places('p3', 'Banglore', 'Rama Temple',
      'https://media-cdn.tripadvisor.com/media/photo-s/0b/60/6a/53/night-view.jpg',
      399.99,
      new Date('2020-01-01'),
      new Date('2020-12-01'),
      'abc'),
  ]);

  constructor () { }

  get places() {
    return this._places.asObservable();
    // return [...this.places];
  }

  getPlaceById(placeId: string) {
    return this.places.pipe(
      take(1),
      map(places => {
        return { ...places.find(x => x.id == placeId) }
      }))
  }

  addPlace(newplaces: Places) {
    return this.places.pipe(
      take(1),
      delay(1000),
      tap(place => {
        this._places.next(place.concat(newplaces));
      }))
  }

  updatePlace(newplaces: Places) {
    return this.places.pipe(
      take(1),
      delay(1000),
      tap(place => {
        const updateIndex = place.findIndex(x => x.id === newplaces.id)
        const updatedPlaces = [...place]
        updatedPlaces[updateIndex]= newplaces;
        this._places.next(updatedPlaces);
      }))
  }

}
