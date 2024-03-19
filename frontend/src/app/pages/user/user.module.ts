import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { SettingsComponent } from './settings/settings.component';
import { SuggestionsComponent } from './suggestions/suggestions.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ProductsComponent } from './products/products.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: UserComponent,
        children: [
          { path: '', redirectTo: 'products', pathMatch: 'full' },
          { path: 'settings', component: SettingsComponent },
          { path: 'suggestions', component: SuggestionsComponent },
          { path: 'notifications', component: NotificationsComponent },
          { path: 'products', component: ProductsComponent },
          { path: 'assistent', component: ChatComponent },
        ],
      },
    ]),
  ],
})
export class UserModule {}
