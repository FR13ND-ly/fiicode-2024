import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MaterialModule } from '../../../../../core/feature/material/material.module';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../../../core/data-access/product.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductEditDialogComponent } from '../../feature/product-edit-dialog/product-edit-dialog.component';

@Component({
  selector: 'product',
  standalone: true,
  imports: [MaterialModule, RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  @Input() product: any;
  @Output() delete = new EventEmitter();
  productService = inject(ProductService);
  dialog = inject(MatDialog);

  onDelete() {
    if (!confirm('Are you sure?')) return;
    this.productService.deleteProduct(this.product.id).subscribe((res) => {
      this.delete.emit();
    });
  }

  onEditProduct() {
    this.dialog.open(ProductEditDialogComponent, {
      data: this.product,
    });
  }
}
