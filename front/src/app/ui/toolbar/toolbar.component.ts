import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { logoutUserRequest } from '../../store/users/users.actions';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.sass']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  user: Observable<null | User>;
  userSub!: Subscription;
  userData: null | User = null;

  constructor(private store: Store<AppState>) {
    this.user = store.select(state => state.users.user);
  }

  ngOnInit(): void {
    this.userSub = this.user.subscribe(user => {
      if (user) {
        this.userData = user;
      }
    });
  }

  logout() {
    this.store.dispatch(logoutUserRequest());
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
