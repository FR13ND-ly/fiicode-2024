import { Component, inject } from '@angular/core';
import { ProductComponent } from '../../../core/ui/product/product.component';
import { ProductService } from '../../../core/data-access/product.service';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../store/user/user.reducer';
import { Observable, map, switchMap } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductComponent, AsyncPipe, NgIf, ProductComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  productService = inject(ProductService);
  store = inject(Store);

  user$ = this.store.select(selectUser).pipe(map((el: any) => el.user));

  products$: Observable<any> = this.user$.pipe(
    switchMap((user: any) => this.productService.getFavorites(user.id))
  );

  recommendations$: Observable<any> = this.user$.pipe(
    switchMap((user: any) => this.productService.getRecommendations(user.id))
  );
}
