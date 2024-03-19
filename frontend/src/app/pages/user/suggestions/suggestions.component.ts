import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { SuggestionService } from '../../../core/data-access/suggestion.service';
import { selectUser } from '../../../store/user/user.reducer';
import { Observable, map, switchMap } from 'rxjs';
import { MaterialModule } from '../../../core/feature/material/material.module';
import { MatDialog } from '@angular/material/dialog';
import { SuggestionEditorDialogComponent } from './feature/suggestion-editor-dialog/suggestion-editor-dialog.component';
import { AsyncPipe, DatePipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-suggestions',
  standalone: true,
  imports: [MaterialModule, NgIf, AsyncPipe, DatePipe],
  templateUrl: './suggestions.component.html',
  styleUrl: './suggestions.component.scss',
})
export class SuggestionsComponent {
  store = inject(Store);
  suggestionService = inject(SuggestionService);
  dialog = inject(MatDialog);

  user$ = this.store.select(selectUser).pipe(map((el: any) => el.user));

  suggestions$: Observable<any> = this.user$.pipe(
    switchMap((user: any) => this.suggestionService.getByUser(user.id))
  );

  onOpenSuggestion(suggestion: any) {
    this.dialog.open(SuggestionEditorDialogComponent, { data: suggestion });
  }

  onDelete(suggestion: any, suggestions: any, index: any) {
    if (!confirm('Are you sure?')) return;
    this.suggestionService.delete(suggestion.id).subscribe(() => {
      suggestions.splice(index, 1);
    });
  }
}
