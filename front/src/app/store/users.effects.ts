import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersService } from '../services/users.service';
import {
  loginUserFailure,
  loginUserRequest,
  loginUserSuccess,
  registerUserFailure,
  registerUserRequest,
  registerUserSuccess
} from './users.actions';
import { map, mergeMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { HelpersService } from '../services/helpers.service';

@Injectable()
export class UsersEffects {

  constructor(private actions: Actions,
              private router: Router,
              private usersService: UsersService,
              private helpers: HelpersService) {
  }

  registerUser = createEffect(() => this.actions.pipe(
    ofType(registerUserRequest),
    mergeMap(({userData}) => this.usersService.register(userData).pipe(
      map(user => registerUserSuccess({user})),
      tap(() => {
        void this.router.navigate(['/']);
        this.helpers.openSnackBar('Registered successful!');
      }),
      this.helpers.catchServerError(registerUserFailure),
    )),
  ));

  loginUser = createEffect(() => this.actions.pipe(
    ofType(loginUserRequest),
    mergeMap(({userData}) => this.usersService.login(userData).pipe(
      map(user => loginUserSuccess({user})),
      tap(() => {
        void this.router.navigate(['/']);
        this.helpers.openSnackBar('Login successful!');
      }),
      this.helpers.catchServerError(loginUserFailure),
    )),
  ));

}
