import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/data-access/product.service';
import { Observable, combineLatest, map, switchMap, tap } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { InfoComponent } from './feature/info/info.component';
import { CommentsComponent } from './ui/comments/comments.component';
import { RatingsComponent } from './feature/ratings/ratings.component';
import { Store } from '@ngrx/store';
import { selectUser } from '../../store/user/user.reducer';
import { SimilarComponent } from './ui/similar/similar.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    AsyncPipe,
    InfoComponent,
    CommentsComponent,
    RatingsComponent,
    SimilarComponent,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  productService = inject(ProductService);
  route = inject(ActivatedRoute);
  store = inject(Store);

  user$ = this.store.select(selectUser).pipe(map((el: any) => el.user));
  product$: Observable<any> = this.route.params.pipe(
    switchMap((params: any) => this.productService.getProduct(params.id))
  );

  vs$: Observable<any> = combineLatest(this.user$, this.product$).pipe(
    map((el: any) => {
      return {
        product: el[1],
        user: el[0],
      };
    })
  );
}
