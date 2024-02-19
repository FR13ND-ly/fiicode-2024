import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './user/user.effects';

@NgModule({
  imports: [EffectsModule.forRoot([UserEffects])],
})
export class AppEffectsModule {}
