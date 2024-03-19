import { Injectable, afterNextRender, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, from, map, of, retry, take, tap } from 'rxjs';

import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { userActions } from '../../store/user/user.actions';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private router = inject(Router);
  private store = inject(Store);

  http = inject(HttpClient);
  apiUrl = environment.apiUrl + 'users/';

  constructor() {
    afterNextRender(() => {
      let token = localStorage.getItem('token');
      if (!token) return;
      this.login(token).subscribe((user: any) => {
        if (!user.logged) return;
        this.store.dispatch(userActions.loginSuccess({ user }));
      });
    });
  }

  signIn(data: any) {
    return this.http.post(`${this.apiUrl}authentification/`, data).pipe(
      tap((user: any) => {
        if (!user.logged) return;
        localStorage.setItem('token', user.token);
        this.store.dispatch(userActions.loginSuccess({ user: user }));
      })
    );
  }

  login(token: any) {
    return this.http.get(`${this.apiUrl}authorization/${token}/`);
  }

  register(data: any) {
    return this.http.post(`${this.apiUrl}register/`, data).pipe(
      tap((user: any) => {
        if (!user.logged) return;
        localStorage.setItem('token', user.token);
      })
    );
  }

  logout() {
    localStorage.setItem('token', '');
    this.router.navigate(['login']);
  }

  getUser(id: any) {
    return this.http.get(`${this.apiUrl}get/${id}/`);
  }

  updateUser(id: any, data: any) {
    return this.http.put(`${this.apiUrl}update/${id}/`, data);
  }

  setPreferences(id: any, data: any) {
    return this.http.post(`${this.apiUrl}preferences/set/${id}/`, data);
  }

  ai(data: any) {
    return this.http.post(`${this.apiUrl}ai/`, data);
  }
}
