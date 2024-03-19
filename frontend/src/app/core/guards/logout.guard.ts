import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { selectUser } from '../../store/user/user.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

export const logoutGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  let store = inject(Store);

  let user$ = store.select(selectUser);
  return user$.pipe(
    map((res: any) => {
      if (res?.user) {
        router.navigate(['/']);
        return false;
      } else {
        return true;
      }
    })
  );
};
