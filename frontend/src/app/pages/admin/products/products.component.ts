import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../../core/feature/material/material.module';
import { MatDialog } from '@angular/material/dialog';
import { AddProductDialogComponent } from './feature/add-product-dialog/add-product-dialog.component';
import { ProductService } from '../../../core/data-access/product.service';
import { ProductComponent } from './ui/product/product.component';
import { Observable } from 'rxjs';
import { ProductEditDialogComponent } from './feature/product-edit-dialog/product-edit-dialog.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MaterialModule, AsyncPipe, ProductComponent, NgIf],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  dialog = inject(MatDialog);
  productsService = inject(ProductService);

  products$: Observable<any> = this.productsService.getAllProducts();

  onAddProduct() {
    let d = this.dialog.open(AddProductDialogComponent);
    d.afterClosed().subscribe((res: any) => {
      this.products$ = this.productsService.getAllProducts();
    });
  }
}
