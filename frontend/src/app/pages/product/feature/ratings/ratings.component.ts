import { Component, Input, OnInit, inject } from '@angular/core';
import { MaterialModule } from '../../../../core/feature/material/material.module';
import { ProductService } from '../../../../core/data-access/product.service';

@Component({
  selector: 'product-ratings',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './ratings.component.html',
  styleUrl: './ratings.component.scss',
})
export class RatingsComponent implements OnInit {
  @Input() vs: any;

  productService = inject(ProductService);

  votesCount = 0;
  userVotedUp: any = null;

  ngOnInit(): void {
    this.setVotes(this.vs.product?.votes);
  }

  vote(up: any) {
    let data = {
      productId: this.vs.product.id,
      userId: this.vs.user.id,
      up,
    };
    this.productService.vote(data).subscribe((res) => {
      this.vs.product.votes = res;
      this.setVotes(res);
    });
  }

  setVotes(votes: any) {
    this.votesCount = 0;
    this.userVotedUp = null;
    votes?.forEach((el: any) => {
      if (el.userId == this.vs.user.id) this.userVotedUp = el.up;
      if (el.up) this.votesCount += 1;
      else this.votesCount += -1;
    });
  }
}
