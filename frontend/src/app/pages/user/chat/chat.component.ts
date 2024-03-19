import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MaterialModule } from '../../../core/feature/material/material.module';
import { UserService } from '../../../core/data-access/user.service';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../store/user/user.reducer';
import { map } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { MarkdownComponent, MarkdownService } from 'ngx-markdown';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgIf,
    AsyncPipe,
    MarkdownComponent,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent {
  store = inject(Store);
  userService = inject(UserService);
  question = new FormControl('', Validators.required);

  user$ = this.store.select(selectUser).pipe(map((user: any) => user.user));

  response: any = signal('');

  loading = signal(false);
  asked = signal(false);

  onSubmit(user: any) {
    if (this.question.invalid) return;
    let data = {
      userId: user.id,
      question: this.question.value,
    };
    this.loading.set(true);
    this.asked.set(true);
    this.userService.ai(data).subscribe((res) => {
      console.log(res);
      this.response.set(res);
      this.loading.set(false);
      this.question.reset();
    });
  }
}
