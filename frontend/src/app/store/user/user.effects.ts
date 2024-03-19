import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../core/data-access/user.service';
import { userActions } from './user.actions';
import { map, switchMap, tap } from 'rxjs';

@Injectable()
export class UserEffects {
  actions$ = inject(Actions);
  userService = inject(UserService);

  login$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(userActions.login),
      switchMap((token: any): any => {
        return this.userService
          .login(token)
          .pipe(map((user: any) => userActions.loginSuccess(user)));
      })
    )
  );

  logout$ = createEffect(
    (): any =>
      this.actions$.pipe(
        ofType(userActions.logout),
        tap(() => this.userService.logout())
      ),
    { dispatch: false }
  );
}
