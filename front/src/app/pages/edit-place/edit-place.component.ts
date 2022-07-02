import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Observable } from 'rxjs';
import { createPlaceRequest } from '../../store/places/places.actions';

@Component({
  selector: 'app-edit-place',
  templateUrl: './edit-place.component.html',
  styleUrls: ['./edit-place.component.sass']
})
export class EditPlaceComponent {
  @ViewChild('f') form!: NgForm;

  createLoading: Observable<boolean>;
  createError: Observable<null | string>;

  constructor(private store: Store<AppState>) {
    this.createLoading = store.select(state => state.places.createLoading);
    this.createError = store.select(state => state.places.createError);
  }

  onSubmit() {
    this.store.dispatch(createPlaceRequest({ data: this.form.value }));
  }
}
