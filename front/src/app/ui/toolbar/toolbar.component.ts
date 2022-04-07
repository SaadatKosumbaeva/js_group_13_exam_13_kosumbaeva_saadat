import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { logoutUserRequest } from '../../store/users/users.actions';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.sass']
})
export class ToolbarComponent implements OnInit {
  user: Observable<null | User>;

  constructor(private store: Store<AppState>) {
    this.user = store.select(state => state.users.user);
  }

  ngOnInit(): void {
  }

  logout() {
    this.store.dispatch(logoutUserRequest());
  }
}
