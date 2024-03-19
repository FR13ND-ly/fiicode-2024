import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SuggestionService } from '../../../../../core/data-access/suggestion.service';
import { MaterialModule } from '../../../../../core/feature/material/material.module';
import { FormsModule } from '@angular/forms';
import { ChipsComponent } from '../../../../../core/feature/chips/chips.component';

@Component({
  selector: 'app-suggestion-editor-dialog',
  standalone: true,
  imports: [MaterialModule, FormsModule, ChipsComponent],
  templateUrl: './suggestion-editor-dialog.component.html',
  styleUrl: './suggestion-editor-dialog.component.scss',
})
export class SuggestionEditorDialogComponent {
  data = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef);
  suggestionService = inject(SuggestionService);

  suggestion: any;

  ngOnInit(): void {
    this.suggestion = { ...this.data };
  }

  onSave() {
    let data = {
      name: this.suggestion.name.new,
      brand: this.suggestion.brand.new,
      imageUrl: this.suggestion.imageUrl.new,
      weight: this.suggestion.weight.new,
      productId: this.suggestion.id,
      allergens: this.suggestion.allergens.new.map((el: any) => el.name),
      categories: this.suggestion.categories.new.map((el: any) => el.name),
      ingredients: this.suggestion.ingredients.new.map((el: any) => el.name),
    };
    this.suggestionService
      .update(this.suggestion.id, data)
      .subscribe(() => this.dialogRef.close());
  }
}
