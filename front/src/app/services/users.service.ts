import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FbLoginUserData, LoginUserData, RegisterUserData, User } from '../models/user.model';
import { environment, environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  constructor(private http: HttpClient) {
  }

  register(userData: RegisterUserData) {
    const formData = new FormData();

    Object.keys(userData).forEach(key => {
      if (userData[key] !== null) {
        formData.append(key, userData[key]);
      }
    });

    return this.http.post<User>(environment.apiUrl + '/users', formData);
  }

  login(userData: LoginUserData) {
    return this.http.post<User>(env.apiUrl + '/users/sessions', userData);
  }

  fbLoginUser(userData: FbLoginUserData) {
    return this.http.post<User>(environment.apiUrl + '/users/facebookLogin', userData);
  }

  logout() {
    return this.http.delete(env.apiUrl + '/users/sessions');
  }
}
