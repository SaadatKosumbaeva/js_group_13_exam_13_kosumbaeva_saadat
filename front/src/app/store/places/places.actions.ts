import { createAction, props } from '@ngrx/store';
import { Place, PlaceData, ReviewData, ImageData } from '../../models/place.model';

export const fetchPlacesRequest = createAction('[Places] Fetch Request');
export const fetchPlacesSuccess = createAction('[Places] Success Request', props<{ items: Place[] }>());
export const fetchPlacesFailure = createAction('[Places] Failure Request');

export const fetchPlaceRequest = createAction('[Place] Fetch Request', props<{ id: string }>());
export const fetchPlaceSuccess = createAction('[Place] Success Request', props<{ item: Place | null }>());
export const fetchPlaceFailure = createAction('[Place] Failure Request');

export const createPlaceRequest = createAction('[Place] Create Request', props<{ data: PlaceData }>());
export const createPlaceSuccess = createAction('[Place] Create Success');
export const createPlaceFailure = createAction('[Place] Create Failure', props<{ error: null | string }>());

export const removePlaceRequest = createAction('[Place] Remove Request', props<{ id: string }>());
export const removePlaceSuccess = createAction('[Place] Remove Success');
export const removePlaceFailure = createAction('[Place] Remove Failure');

export const createReviewRequest = createAction('[Review] Create Request', props<{ data: ReviewData, id: string }>());
export const createReviewSuccess = createAction('[Review] Create Success');
export const createReviewFailure = createAction('[Review] Create Failure', props<{ error: null | string }>());

export const uploadImageRequest = createAction('[Image] Upload Request', props<{ data: ImageData, id: string }>());
export const uploadImageSuccess = createAction('[Image] Upload Success');
export const uploadImageFailure = createAction('[Image] Upload Failure', props<{ error: null | string }>());
