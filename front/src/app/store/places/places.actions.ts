import { createAction, props } from '@ngrx/store';
import { Place, PlaceData } from '../../models/place.model';

export const fetchPlacesRequest = createAction('[Places] Fetch Request');
export const fetchPlacesSuccess = createAction('[Places] Success Request', props<{ items: Place[] }>());
export const fetchPlacesFailure = createAction('[Places] Failure Request');

export const fetchPlaceRequest = createAction('[Place] Fetch Request', props<{ id: string }>());
export const fetchPlaceSuccess = createAction('[Place] Success Request', props<{ item: Place | null }>());
export const fetchPlaceFailure = createAction('[Place] Failure Request');

export const createPlaceRequest = createAction('[Place] Create Request', props<{ data: PlaceData }>());
export const createPlaceSuccess = createAction('[Place] Create Success');
export const createPlaceFailure = createAction('[Place] Create Failure', props<{ error: null | string }>());
