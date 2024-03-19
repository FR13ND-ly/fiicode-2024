import { Component, inject } from '@angular/core';
import { ThemeService } from '../../data-access/theme.service';
import { AsyncPipe, DatePipe, JsonPipe } from '@angular/common';
import { MaterialModule } from '../../feature/material/material.module';
import { UserService } from '../../data-access/user.service';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../store/user/user.reducer';
import { Observable, map, switchMap, tap } from 'rxjs';
import { RouterLink } from '@angular/router';
import { userActions } from '../../../store/user/user.actions';
import { BlogService } from '../../data-access/blog.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MaterialModule, AsyncPipe, RouterLink, DatePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  themeService = inject(ThemeService);
  userService = inject(UserService);
  store = inject(Store);
  blogService = inject(BlogService);

  theme$ = this.themeService.theme$;
  user$ = this.store.select(selectUser).pipe(map((el: any) => el.user));
  notifications$: Observable<any> = this.user$.pipe(
    switchMap((user: any) => this.blogService.getNotificationsLast(user.id))
  );

  onToggleTheme() {
    this.themeService.toggleTheme();
  }

  onLogin() {
    console.log('a');
  }

  onLogout() {
    this.store.dispatch(userActions.logout());
  }

  onOpenNotifications(notifications: any) {
    this.blogService
      .seen(notifications.userId)
      .subscribe(() => (notifications.unseen = 0));
  }
}
