import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { AddCommentComponent } from '../add-comment/add-comment.component';
import { CommentComponent } from '../../feature/comment/comment.component';
import { ProductService } from '../../../../core/data-access/product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'product-comments',
  standalone: true,
  imports: [AsyncPipe, AddCommentComponent, CommentComponent, JsonPipe],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
})
export class CommentsComponent implements OnInit {
  @Input() vs: any;
  productService = inject(ProductService);

  comments$!: Observable<any>;

  ngOnInit(): void {
    this.comments$ = this.productService.getComments(this.vs.product?.id);
  }
}
