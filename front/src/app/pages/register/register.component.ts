import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { registerUserRequest } from '../../store/users.actions';
import { Observable, Subscription } from 'rxjs';
import { RegisterError } from '../../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements AfterViewInit, OnDestroy {
  @ViewChild('f') form!: NgForm;
  error: Observable<null | RegisterError>;
  errorSub!: Subscription;
  loading: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.error = store.select(state => state.users.registerError);
    this.loading = store.select(state => state.users.registerLoading);
  }

  ngAfterViewInit() {
    this.errorSub = this.error.subscribe(err => {
      if (err) {
        if (err.errors.email) {
          const msg = err.errors.email.message;
          this.form.form.get('email')?.setErrors({serverError: msg});
        } else {
          this.form.form.get('email')?.setErrors(null);
        }

        if (err.errors.displayName) {
          const msg = err.errors.displayName.message;
          this.form.form.get('displayName')?.setErrors({serverError: msg});
        } else {
          this.form.form.get('displayName')?.setErrors(null);
        }
      }
    });
  }

  onSubmit() {
    this.store.dispatch(registerUserRequest({userData: this.form.value}));
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }
}
