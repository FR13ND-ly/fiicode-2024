import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const userActions = createActionGroup({
  source: 'USER',
  events: {
    login: emptyProps,
    logout: emptyProps,
    loginSuccess: props<{ user: any }>(),
  },
});
