import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, from, map, of, take } from 'rxjs';
import {
  Auth,
  AuthInstances,
  GoogleAuthProvider,
  User,
  authInstance$,
  authState,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  user,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { userActions } from './user.actions';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  authd = AuthInstances;
  user: any;
  private router = inject(Router);

  constructor(private store: Store) {
    this.user$
      .pipe(filter((user: any) => !!user))
      .subscribe((user: User | null) => {
        this.user = {
          id: user?.uid,
          name: user?.displayName,
          email: user?.email,
          photoURL: user?.photoURL,
        };
        this.store.dispatch(userActions.loginSuccess(this.user));
      });
  }

  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }

  AuthLogin(provider: any) {
    return from(signInWithPopup(this.auth, provider)).pipe(
      map((res: any) => {
        let user = {
          uid: res.user.uid,
          email: res.user.email,
          displayName: res.user.displayName,
          photoURL: res.user.photoURL,
        };
        return user;
      })
    );
  }

  login() {
    return this.GoogleAuth();
  }

  logout() {
    // this.user$.pipe(take(1)).subscribe((res) => console.log(res));
    // from(signOut(auth)).subscribe(
    //   (res) => console.log(res),
    //   (err) => console.log(err)
    // );
    // this.router.navigateByUrl('/about');
  }
}
