import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../../../core/data-access/product.service';
import { Observable, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ProductComponent } from '../../../../core/ui/product/product.component';

@Component({
  selector: 'product-similar',
  standalone: true,
  imports: [RouterLink, AsyncPipe, ProductComponent],
  templateUrl: './similar.component.html',
  styleUrl: './similar.component.scss',
})
export class SimilarComponent {
  productService = inject(ProductService);
  route = inject(ActivatedRoute);

  products$: Observable<any> = this.route.params.pipe(
    switchMap((params: any) => this.productService.getSimilar(params.id))
  );
}
