import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../core/feature/material/material.module';
import { UserService } from '../../core/data-access/user.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  userService = inject(UserService);
  fb = inject(FormBuilder);
  snackbar = inject(MatSnackBar);
  router = inject(Router);

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit() {
    if (this.loginForm.invalid) return;
    let data = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };
    this.userService.signIn(data).subscribe(() => this.router.navigate(['']));
  }
}
