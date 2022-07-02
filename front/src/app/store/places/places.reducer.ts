import { PlacesState } from '../types';
import { createReducer, on } from '@ngrx/store';
import { fetchPlacesFailure, fetchPlacesRequest, fetchPlacesSuccess } from './places.actions';

const initialState: PlacesState = {
  items: [],
  fetchLoading: false,
};

export const placesReducer = createReducer(
  initialState,
  on(fetchPlacesRequest, state => ({...state, fetchLoading: true})),
  on(fetchPlacesSuccess, (state, {items}) => ({...state, fetchLoading: false, items})),
  on(fetchPlacesFailure, state => ({...state, fetchLoading: false})),
)
