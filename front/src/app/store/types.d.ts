import { LoginError, RegisterError, User } from '../models/user.model';
import { Place } from '../models/place.model';

export type UsersState = {
  user: null | User,
  registerLoading: boolean,
  registerError: null | RegisterError,
  loginLoading: boolean,
  loginError: null | LoginError,
  fbLoginLoading: boolean,
};

export type PlacesState = {
  items: Place[],
  fetchLoading: boolean,
  item: Place | null,
  fetchPersonalLoading: boolean,
  createLoading: boolean,
  createError: string | null,
  removeLoading: boolean,
  createReviewLoading: boolean,
  createReviewError: null | string,
  uploadImageLoading: boolean,
}

export type AppState = {
  users: UsersState,
  places: PlacesState,
};
