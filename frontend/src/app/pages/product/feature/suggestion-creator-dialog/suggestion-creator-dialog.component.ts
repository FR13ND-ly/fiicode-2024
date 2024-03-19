import { Component, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChipsComponent } from '../../../../core/feature/chips/chips.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../core/feature/material/material.module';
import { SuggestionService } from '../../../../core/data-access/suggestion.service';

@Component({
  selector: 'app-suggestion-creator-dialog',
  standalone: true,
  imports: [MaterialModule, FormsModule, ChipsComponent],
  templateUrl: './suggestion-creator-dialog.component.html',
  styleUrl: './suggestion-creator-dialog.component.scss',
})
export class SuggestionCreatorDialogComponent implements OnInit {
  data = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef);
  suggestionService = inject(SuggestionService);

  product: any;

  ngOnInit(): void {
    this.product = { ...this.data };
  }

  onSave() {
    let data = {
      ...this.product,
      productId: this.product.id,
      allergens: this.product.allergens.map((el: any) => el.name),
      categories: this.product.categories.map((el: any) => el.name),
      ingredients: this.product.ingredients.map((el: any) => el.name),
    };
    this.suggestionService.create(data).subscribe(() => this.dialogRef.close());
  }
}
