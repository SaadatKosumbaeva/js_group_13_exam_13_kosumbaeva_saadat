import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { PlacesComponent } from './pages/places/places.component';
import { EditPlaceComponent } from './pages/edit-place/edit-place.component';
import { PlaceDetailsComponent } from './pages/place-details/place-details.component';
import { RoleGuardService } from './services/role-guard.service';

const routes: Routes = [
  { path: '', component: PlacesComponent },
  {
    path: 'new-place',
    component: EditPlaceComponent,
    canActivate: [RoleGuardService],
    data: { roles: ['admin', 'user'] },
  },
  { path: 'places/:id', component: PlaceDetailsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
