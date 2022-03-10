import { createAction, props } from '@ngrx/store';
import { RegisterError, RegisterUserData, User } from '../models/user.model';

export const registerUserRequest = createAction('[Users] Register Request', props<{ userData: RegisterUserData }>());
export const registerUserSuccess = createAction('[Users] Register Success', props<{ user: User }>());
export const registerUserFailure = createAction('[Users] Register Failure', props<{ error: RegisterError }>());



