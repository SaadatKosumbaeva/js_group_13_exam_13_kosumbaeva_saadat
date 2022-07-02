import { PlacesState } from '../types';
import { createReducer, on } from '@ngrx/store';
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

const initialState: PlacesState = {
  item: null,
  items: [],
  fetchLoading: false,
  fetchPersonalLoading: false,
  createLoading: false,
  createError: null,
  removeLoading: false,
  createReviewLoading: false,
  createReviewError: null,
  uploadImageLoading: false,
};

export const placesReducer = createReducer(
  initialState,
  on(fetchPlacesRequest, state => ({ ...state, fetchLoading: true })),
  on(fetchPlacesSuccess, (state, { items }) => ({ ...state, fetchLoading: false, items })),
  on(fetchPlacesFailure, state => ({ ...state, fetchLoading: false })),
  on(fetchPlaceRequest, state => ({ ...state, fetchPersonalLoading: true })),
  on(fetchPlaceSuccess, (state, { item }) => ({ ...state, fetchPersonalLoading: false, item })),
  on(fetchPlaceFailure, state => ({ ...state, fetchPersonalLoading: false })),
  on(createPlaceRequest, state => ({ ...state, createError: null, createLoading: true })),
  on(createPlaceSuccess, state => ({ ...state, createLoading: false })),
  on(createPlaceFailure, (state, { error }) => ({ ...state, createLoading: false, createError: error })),
  on(removePlaceRequest, state => ({...state, removeLoading: true})),
  on(removePlaceSuccess, state => ({...state, removeLoading: false})),
  on(removePlaceFailure, state => ({...state, removeLoading: true})),
  on(createReviewRequest, state => ({ ...state, createReviewError: null, createReviewLoading: true })),
  on(createReviewSuccess, state => ({ ...state, createReviewLoading: false })),
  on(createReviewFailure, (state, { error }) => ({ ...state, createReviewLoading: false, createReviewError: error })),
  on(uploadImageRequest, state => ({ ...state, uploadImageLoading: true})),
  on(uploadImageSuccess, state => ({ ...state, uploadImageLoading: false })),
  on(uploadImageFailure, (state, { error }) => ({ ...state, uploadImageLoading: false })),
)
