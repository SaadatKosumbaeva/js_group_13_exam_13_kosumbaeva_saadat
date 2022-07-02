import { PlacesState } from '../types';
import { createReducer, on } from '@ngrx/store';
import {
  fetchPlaceFailure,
  fetchPlaceRequest,
  fetchPlacesFailure,
  fetchPlacesRequest,
  fetchPlacesSuccess,
  fetchPlaceSuccess
} from './places.actions';

const initialState: PlacesState = {
  item: null,
  items: [],
  fetchLoading: false,
  fetchPersonalLoading: false,
};

export const placesReducer = createReducer(
  initialState,
  on(fetchPlacesRequest, state => ({...state, fetchLoading: true})),
  on(fetchPlacesSuccess, (state, {items}) => ({...state, fetchLoading: false, items})),
  on(fetchPlacesFailure, state => ({...state, fetchLoading: false})),
  on(fetchPlaceRequest, state => ({...state, fetchPersonalLoading: true})),
  on(fetchPlaceSuccess, (state, {item}) => ({...state, fetchPersonalLoading: false, item})),
  on(fetchPlaceFailure, state => ({...state, fetchPersonalLoading: false})),
)
