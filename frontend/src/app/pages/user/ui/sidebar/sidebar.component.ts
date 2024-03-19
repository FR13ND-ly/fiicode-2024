import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../../../core/feature/material/material.module';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../../../core/data-access/user.service';

@Component({
  selector: 'user-sidebar',
  standalone: true,
  imports: [MaterialModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  userService = inject(UserService);

  onLogout() {
    this.userService.logout();
  }
}
