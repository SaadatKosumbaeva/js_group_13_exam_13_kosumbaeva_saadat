import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../types';
import { HelpersService } from '../../services/helpers.service';
import { PlacesService } from '../../services/places.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import {
  createPlaceFailure,
  createPlaceRequest,
  createPlaceSuccess,
  createReviewFailure,
  createReviewRequest,
  createReviewSuccess,
  fetchPlaceFailure,
  fetchPlaceRequest,
  fetchPlacesFailure,
  fetchPlacesRequest,
  fetchPlacesSuccess,
  fetchPlaceSuccess,
  removePlaceFailure,
  removePlaceRequest,
  removePlaceSuccess,
  uploadImageFailure,
  uploadImageRequest,
  uploadImageSuccess
} from './places.actions';
import { Router } from '@angular/router';

@Injectable()
export class PlacesEffects {
  constructor(private actions: Actions,
              private store: Store<AppState>,
              private helpers: HelpersService,
              private placesService: PlacesService,
              private router: Router,
  ) {
  }

  fetchPlaces = createEffect(() => this.actions.pipe(
    ofType(fetchPlacesRequest),
    mergeMap(() => this.placesService.fetchPlaces().pipe(
      map(items => fetchPlacesSuccess({ items })),
      catchError(() => {
        this.helpers.openSnackBar('Could not get places');
        return of(fetchPlacesFailure());
      }),
    )),
  ));

  fetchPlace = createEffect(() => this.actions.pipe(
    ofType(fetchPlaceRequest),
    mergeMap(({ id }) => this.placesService.fetchPlace(id).pipe(
      map(item => fetchPlaceSuccess({ item })),
      catchError(() => {
        this.helpers.openSnackBar('Could not get place');
        return of(fetchPlaceFailure());
      }),
    )),
  ));

  createPlace = createEffect(() => this.actions.pipe(
    ofType(createPlaceRequest),
    mergeMap(({ data }) => this.placesService.createPlace(data).pipe(
      map(() => createPlaceSuccess()),
      tap(() => {
        this.helpers.openSnackBar('Uploaded successful!');
        void this.router.navigate(['/']);
      }),
      catchError((error) => {
        this.helpers.openSnackBar('Could not create place');
        return of(createPlaceFailure({ error }));
      }),
    )),
  ));

  removePlace = createEffect(() => this.actions.pipe(
    ofType(removePlaceRequest),
    mergeMap(({id}) => this.placesService.removeImage(id).pipe(
      map(() => removePlaceSuccess()),
      tap(() => this.store.dispatch(fetchPlacesRequest())),
      catchError(() => {
        this.helpers.openSnackBar('Could not delete place');
        return of(removePlaceFailure());
      }),
    )),
  ));

  createReview = createEffect(() => this.actions.pipe(
    ofType(createReviewRequest),
    mergeMap(({ data, id }) => this.placesService.createReview(id, data).pipe(
      map(() => createReviewSuccess()),
      tap(() => {
        this.store.dispatch(fetchPlaceRequest({id}));
        this.helpers.openSnackBar('Uploaded successful!');
      }),
      catchError((error) => {
        this.helpers.openSnackBar('Could not create review');
        return of(createReviewFailure({ error }));
      }),
    )),
  ));

  uploadImage = createEffect(() => this.actions.pipe(
    ofType(uploadImageRequest),
    mergeMap(({ data, id }) => this.placesService.uploadImage(data, id).pipe(
      map(() => uploadImageSuccess()),
      tap(() => {
        this.store.dispatch(fetchPlaceRequest({id}));
        this.helpers.openSnackBar('Uploaded successful!');
      }),
      catchError((error) => {
        this.helpers.openSnackBar('Could not upload image');
        return of(uploadImageFailure({ error }));
      }),
    )),
  ));
}
