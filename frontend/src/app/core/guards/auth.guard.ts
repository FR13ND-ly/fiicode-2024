import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUser } from '../../store/user/user.reducer';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  let store = inject(Store);

  let user$ = store.select(selectUser);
  return user$.pipe(
    map((res: any) => {
      if (res?.user) {
        return true;
      } else {
        router.navigate(['login']);
        return false;
      }
    })
  );
};
