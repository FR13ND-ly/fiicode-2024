import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MaterialModule } from '../../../../core/feature/material/material.module';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../../../../core/data-access/product.service';

@Component({
  selector: 'add-comment',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-comment.component.html',
  styleUrl: './add-comment.component.scss',
})
export class AddCommentComponent {
  @Input() vs: any;
  @Output() add = new EventEmitter();
  productService = inject(ProductService);
  comment = new FormControl('', Validators.required);

  onPublish() {
    if (this.comment.invalid) return;
    let data = {
      productId: this.vs.product.id,
      userId: this.vs.user.id,
      content: this.comment.value,
    };
    this.productService.createComment(data).subscribe((res) => {
      if (!res) return;
      this.add.emit(res);
      this.comment.reset();
    });
  }
}
