import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { usersReducer } from './users/users.reducer';
import { UsersEffects } from './users/users.effects';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { placesReducer } from './places/places.reducer';
import { PlacesEffects } from './places/places.effects';

const localStorageSyncReducer = (reducer: ActionReducer<any>) => {
  return localStorageSync({
    keys: [{users: ['user']}],
    rehydrate: true
  })(reducer);
};

const metaReducers: MetaReducer[] = [localStorageSyncReducer];

const reducers = {
  users: usersReducer,
  places: placesReducer,
};

const effects = [UsersEffects, PlacesEffects];

@NgModule({
  imports: [
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot(effects),
  ],
  exports: [StoreModule, EffectsModule],
})
export class AppStoreModule {}
