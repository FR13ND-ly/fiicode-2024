import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SuggestionService } from '../../../../core/data-access/suggestion.service';
import { MaterialModule } from '../../../../core/feature/material/material.module';
import { NgIf } from '@angular/common';
import { DifferencesComponent } from '../ui/differences/differences.component';

@Component({
  selector: 'app-suggestion-details-dialog',
  standalone: true,
  imports: [MaterialModule, NgIf, DifferencesComponent],
  templateUrl: './suggestion-details-dialog.component.html',
  styleUrl: './suggestion-details-dialog.component.scss',
})
export class SuggestionDetailsDialogComponent {
  data = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef);
  suggestionService = inject(SuggestionService);

  suggestion: any;
  allergens: any;
  categories: any;
  ingredients: any;

  ngOnInit(): void {
    this.suggestion = { ...this.data };
    this.allergens = this.setDifferences(this.suggestion.allergens);
    this.categories = this.setDifferences(this.suggestion.categories);
    this.ingredients = this.setDifferences(this.suggestion.ingredients);
  }

  onApprove() {
    if (!confirm('Are you sure?')) return;
    this.suggestionService.approve(this.suggestion.id).subscribe(() => {
      this.dialogRef.close();
    });
  }

  onDisApprove() {
    if (!confirm('Are you sure?')) return;
    this.suggestionService.disapprove(this.suggestion.id).subscribe(() => {
      this.dialogRef.close();
    });
  }

  onDelete() {
    if (!confirm('Are you sure?')) return;
    this.suggestionService.delete(this.suggestion.id).subscribe(() => {
      this.dialogRef.close();
    });
  }

  setDifferences(stages: any) {
    let res = {
      added: [],
      removed: [],
    };
    let newArr = stages.new.map((el: any) => el.name);
    let oldArr = stages.old.map((el: any) => el.name);

    res.added = newArr.filter((el: any) => !oldArr.includes(el));
    res.removed = oldArr.filter((el: any) => !newArr.includes(el));
    console.log(stages);
    return res;
  }
}
