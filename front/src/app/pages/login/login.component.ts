import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { FbLoginUserData, LoginError } from '../../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { fbLoginRequest, loginUserRequest } from '../../store/users/users.actions';
import { FacebookLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild('f') form!: NgForm;
  error: Observable<null | LoginError>;
  loading: Observable<boolean>;
  authStateSub!: Subscription;
  fbLoading: Observable<boolean>;

  constructor(private store: Store<AppState>,
              private auth: SocialAuthService,) {
    this.error = store.select(state => state.users.loginError);
    this.loading = store.select(state => state.users.loginLoading);
    this.fbLoading = store.select(state => state.users.fbLoginLoading);
  }

  ngOnInit(): void {
    this.authStateSub = this.auth.authState.subscribe((user: SocialUser) => {
      if (user) {
        const userData: FbLoginUserData = {
          authToken: user.authToken,
          id: user.id,
          email: user.email,
          name: user.name,
          picUrl: user.response.picture.data.url,
        };
        this.store.dispatch(fbLoginRequest({userData}));
      }
    });
  }

  onSubmit() {
    this.store.dispatch(loginUserRequest({userData: this.form.form.value}));
  }

  fbLogin() {
    void this.auth.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  ngOnDestroy() {
    this.authStateSub.unsubscribe();
  }
}
