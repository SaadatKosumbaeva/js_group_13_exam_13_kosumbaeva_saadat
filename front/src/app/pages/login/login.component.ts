import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { LoginError } from '../../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { loginUserRequest } from '../../store/users.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  error: Observable<null | LoginError>;
  loading: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.error = store.select(state => state.users.loginError);
    this.loading = store.select(state => state.users.loginLoading);
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.store.dispatch(loginUserRequest({userData: this.form.form.value}));
  }
}
