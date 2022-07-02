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
}

export type AppState = {
  users: UsersState,
  places: PlacesState,
};
