import { Component, Input, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SuggestionCreatorDialogComponent } from '../suggestion-creator-dialog/suggestion-creator-dialog.component';
import { MaterialModule } from '../../../../core/feature/material/material.module';
import { ProductService } from '../../../../core/data-access/product.service';

@Component({
  selector: 'product-info',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss',
})
export class InfoComponent {
  @Input() vs: any;
  dialog = inject(MatDialog);
  productService = inject(ProductService);

  onEdit() {
    this.dialog.open(SuggestionCreatorDialogComponent, {
      data: {
        ...this.vs.product,
        userId: this.vs.user.id,
      },
    });
  }

  onFavorite() {
    let data = {
      productId: this.vs.product.id,
      userId: this.vs.user.id,
    };
    this.productService.favorite(data).subscribe((res) => {
      this.vs.product.favorites = res;
    });
  }
}
