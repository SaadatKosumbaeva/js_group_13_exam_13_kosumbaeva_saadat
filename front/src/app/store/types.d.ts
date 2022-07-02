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
}

export type AppState = {
  users: UsersState,
  places: PlacesState,
};
