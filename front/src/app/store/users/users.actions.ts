import { createAction, props } from '@ngrx/store';
import {
  FbLoginUserData,
  LoginError,
  LoginUserData,
  RegisterError,
  RegisterUserData,
  User
} from '../../models/user.model';

export const registerUserRequest = createAction('[Users] Register Request', props<{ userData: RegisterUserData }>());
export const registerUserSuccess = createAction('[Users] Register Success', props<{ user: User }>());
export const registerUserFailure = createAction('[Users] Register Failure', props<{ error: null | RegisterError }>());

export const loginUserRequest = createAction('[Users] Login Request', props<{ userData: LoginUserData }>());
export const loginUserSuccess = createAction('[Users] Login Success', props<{ user: User }>());
export const loginUserFailure = createAction('[Users] Login Failure', props<{ error: null | LoginError }>());

export const fbLoginRequest = createAction('[Users] Fb Login Request', props<{ userData: FbLoginUserData }>());
export const fbLoginSuccess = createAction('[Users] Fb Login Success', props<{ user: User }>());
export const fbLoginFailure = createAction('[Users] Fb Login Failure', props<{ error: null | LoginError }>());

export const logoutUser = createAction('[Users] Logout User');
export const logoutUserRequest = createAction('[Users] Server Logout Request');



