import { Routes } from '@angular/router';
import { logoutGuard } from './core/guards/logout.guard';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'about',
    loadChildren: () =>
      import('./pages/landing-page/landing-page.module').then(
        (m) => m.LandingPageModule
      ),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.module').then((m) => m.RegisterModule),
    canActivate: [logoutGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
    canActivate: [logoutGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./core/ui/shell/shell.module').then((m) => m.ShellModule),
    canActivate: [authGuard],
  },
  {
    path: '**',
    loadChildren: () =>
      import('./pages/notfound/notfound.module').then((m) => m.NotfoundModule),
  },
];
