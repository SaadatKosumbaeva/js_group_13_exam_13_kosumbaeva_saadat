import { UsersState } from '../types';
import { createReducer, on } from '@ngrx/store';
import {
  fbLoginFailure,
  fbLoginRequest, fbLoginSuccess,
  loginUserFailure,
  loginUserRequest,
  loginUserSuccess,
  logoutUser,
  registerUserFailure,
  registerUserRequest,
  registerUserSuccess
} from './users.actions';

const initialState: UsersState = {
  user: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
  fbLoginLoading: false,
};

export const usersReducer = createReducer(
  initialState,
  on(registerUserRequest, state => ({...state, registerLoading: true, registerError: null})),
  on(registerUserSuccess, (state, {user}) => ({...state, registerLoading: false, user})),
  on(registerUserFailure, (state, {error}) => ({...state, registerLoading: false, registerError: error})),
  on(loginUserRequest, state => ({...state, loginLoading: true, loginError: null})),
  on(loginUserSuccess, (state, {user}) => ({...state, loginLoading: false, user})),
  on(loginUserFailure, (state, {error}) => ({...state, loginLoading: false, loginError: error})),
  on(fbLoginRequest, state => ({...state, fbLoginLoading: true, loginError: null})),
  on(fbLoginSuccess, (state, {user}) => ({...state, fbLoginLoading: false, user})),
  on(fbLoginFailure, (state, {error}) => ({...state, fbLoginLoading: false, loginError: error})),
  on(logoutUser, state => ({...state, user: null})),
);
