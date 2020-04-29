import { Injectable } from '@angular/core';
import { Places } from './places.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private places: Places[] = [
    new Places('p1', 'Agra', 'Taj Mahal',
      'https://static.toiimg.com/thumb/msid-31346158,width-748,height-499,resizemode=4,imgsize-114461/Agra.jpg',
      599.99,
      new Date('2020-01-01'),
      new Date('2020-12-01')),
    new Places('p2', 'Chennai', 'Marina Beach',
      'https://marinabeachclub.com/wp-content/uploads/2018/05/bg_atardecer_01.jpg',
      299.99,
      new Date('2020-01-01'),
      new Date('2020-12-01')),
    new Places('p3', 'Banglore', 'Rama Temple',
      'https://media-cdn.tripadvisor.com/media/photo-s/0b/60/6a/53/night-view.jpg',
      399.99,
      new Date('2020-01-01'),
      new Date('2020-12-01')),
  ];

  constructor () { }

  getPlaces() {
    return [...this.places];
  }

  getPlaceById(placeId: string) {
    return { ...this.places.find(x => x.id === placeId) };
  }
}
