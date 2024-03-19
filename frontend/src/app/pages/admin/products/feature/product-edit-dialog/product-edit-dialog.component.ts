import { Component, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../../../../core/feature/material/material.module';
import { FormsModule } from '@angular/forms';
import { ChipsComponent } from '../../../../../core/feature/chips/chips.component';
import { ProductService } from '../../../../../core/data-access/product.service';

@Component({
  selector: 'app-product-edit-dialog',
  standalone: true,
  imports: [MaterialModule, FormsModule, ChipsComponent],
  templateUrl: './product-edit-dialog.component.html',
  styleUrl: './product-edit-dialog.component.scss',
})
export class ProductEditDialogComponent implements OnInit {
  data = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef);
  productsService = inject(ProductService);

  product: any;

  ngOnInit(): void {
    this.product = { ...this.data };
  }

  onSave() {
    let data = {
      ...this.product,
      allergens: this.product.allergens.map((el: any) => el.name),
      categories: this.product.categories.map((el: any) => el.name),
      ingredients: this.product.ingredients.map((el: any) => el.name),
    };
    this.productsService
      .updateProduct(this.product.id, data)
      .subscribe((res: any) => {
        this.data.name = res.name;
        this.data.brand = res.brand;
        this.data.weight = res.weight;
        this.dialogRef.close();
      });
  }
}
