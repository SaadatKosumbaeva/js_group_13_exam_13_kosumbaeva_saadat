import { createAction, props } from '@ngrx/store';
import { Place } from '../../models/place.model';

export const fetchPlacesRequest = createAction('[Places] Fetch Request');
export const fetchPlacesSuccess = createAction('[Places] Success Request', props<{ items: Place[] }>());
export const fetchPlacesFailure = createAction('[Places] Failure Request');
