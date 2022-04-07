import { User } from './models/user.model';
import { catchError, Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from './store/types';
import { HelpersService } from './services/helpers.service';
import { Router } from '@angular/router';
import { logoutUser } from './store/users/users.actions';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  user: Observable<null | User>;
  token: null | string = null;

  constructor(private store: Store<AppState>,
              private helpers: HelpersService,
              private router: Router,) {
    this.user = store.select(state => state.users.user);
    this.user.subscribe(user => {
      this.token = user ? user.token : null;
    });
  }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.token) {
      req = req.clone({
        setHeaders: {'Authorization': this.token},
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 0) {
          this.helpers.openSnackBar('Internet error');
        }

        if (error.status === 401) {
          this.store.dispatch(logoutUser());
          void this.router.navigate(['/login']);
        }

        return throwError(() => error);
      })
    );
  }
}
