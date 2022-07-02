import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../types';
import { HelpersService } from '../../services/helpers.service';
import { PlacesService } from '../../services/places.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { fetchPlacesFailure, fetchPlacesRequest, fetchPlacesSuccess } from './places.actions';

@Injectable()
export class PlacesEffects {
  constructor(private actions: Actions,
              private store: Store<AppState>,
              private helpers: HelpersService,
              private placesService: PlacesService,
  ) {
  }

  fetchImages = createEffect(() => this.actions.pipe(
    ofType(fetchPlacesRequest),
    mergeMap(() => this.placesService.fetchPlaces().pipe(
      map(items => fetchPlacesSuccess({ items })),
      catchError(() => {
        this.helpers.openSnackBar('Could not get places');
        return of(fetchPlacesFailure());
      }),
    )),
  ));
}
