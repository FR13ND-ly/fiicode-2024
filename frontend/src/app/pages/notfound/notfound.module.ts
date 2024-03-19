import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotfoundComponent } from './notfound.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([{ path: '', component: NotfoundComponent }]),
  ],
})
export class NotfoundModule {}
