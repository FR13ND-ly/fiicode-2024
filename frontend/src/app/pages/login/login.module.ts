import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild([{ path: '', component: LoginComponent }])],
})
export class LoginModule {}
