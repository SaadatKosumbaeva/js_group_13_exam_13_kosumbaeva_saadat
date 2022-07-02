import { PlacesState } from '../types';
import { createReducer, on } from '@ngrx/store';
import {
  createPlaceFailure,
  createPlaceRequest,
  createPlaceSuccess,
  fetchPlaceFailure,
  fetchPlaceRequest,
  fetchPlacesFailure,
  fetchPlacesRequest,
  fetchPlacesSuccess,
  fetchPlaceSuccess, removePlaceFailure, removePlaceRequest, removePlaceSuccess
} from './places.actions';

const initialState: PlacesState = {
  item: null,
  items: [],
  fetchLoading: false,
  fetchPersonalLoading: false,
  createLoading: false,
  createError: null,
  removeLoading: false,
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
)
