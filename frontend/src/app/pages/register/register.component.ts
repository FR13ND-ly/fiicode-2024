import { Component, inject, signal } from '@angular/core';
import { MaterialModule } from '../../core/feature/material/material.module';
import { UserService } from '../../core/data-access/user.service';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NextStepComponent } from './feature/next-step/next-step.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RegisterComponent,
    NextStepComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  userService = inject(UserService);
  fb = inject(FormBuilder);
  snackbar = inject(MatSnackBar);

  registrationForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  nextStep = signal(false);
  user: any;

  onSubmit() {
    if (this.registrationForm.invalid) return;
    let data = {
      username: this.registrationForm.value.username,
      password: this.registrationForm.value.password,
    };
    this.userService.register(data).subscribe(
      (res: any) => {
        this.user = res;
        this.nextStep.set(true);
      },
      (err) => {
        this.snackbar.open(err.error.message, '', { duration: 3000 });
      }
    );
  }
}
