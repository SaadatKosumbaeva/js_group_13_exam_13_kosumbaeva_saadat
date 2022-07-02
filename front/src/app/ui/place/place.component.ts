import { Component, Input, OnInit } from '@angular/core';
import { Place } from '../../models/place.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Observable } from 'rxjs';
import { removePlaceRequest } from '../../store/places/places.actions';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.sass']
})
export class PlaceComponent implements OnInit {
  @Input() place!: Place;

  removeLoading: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.removeLoading = store.select(state => state.places.removeLoading);
  }

  ngOnInit(): void {
  }

  remove() {
    this.store.dispatch(removePlaceRequest({ id: this.place._id }))
  }
}
