import { Component, Input, inject } from '@angular/core';
import { MaterialModule } from '../../../../core/feature/material/material.module';
import { ChipsComponent } from '../../../../core/feature/chips/chips.component';
import { UserService } from '../../../../core/data-access/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'next-step',
  standalone: true,
  imports: [MaterialModule, ChipsComponent],
  templateUrl: './next-step.component.html',
  styleUrl: './next-step.component.scss',
})
export class NextStepComponent {
  @Input() userId: any;
  userService = inject(UserService);
  router = inject(Router);

  allergens = [];
  dietaryPrefs = [];

  onSetPreferences() {
    let data = {
      allergens: this.allergens.map((el: any) => el.name),
      dietaryPrefs: this.dietaryPrefs.map((el: any) => el.name),
    };
    this.userService
      .setPreferences(this.userId, data)
      .subscribe((res) => this.router.navigate(['blog']));
  }
}
