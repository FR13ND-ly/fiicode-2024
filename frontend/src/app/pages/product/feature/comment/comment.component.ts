import { DatePipe, JsonPipe, NgIf } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
  signal,
} from '@angular/core';
import { MaterialModule } from '../../../../core/feature/material/material.module';
import {
  FormControl,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../../../../core/data-access/product.service';
import { UserComponent } from '../../../../core/ui/user/user.component';

@Component({
  selector: 'comment',
  standalone: true,
  imports: [
    UserComponent,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    DatePipe,
    NgIf,
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  @Input() comment: any;
  @Input() userId: any;
  @Output() delete = new EventEmitter();
  productService = inject(ProductService);
  reply = signal(false);

  commentEdit: any = new FormControl('', Validators.required);
  subCommentEdit: any = new FormControl('', Validators.required);

  onEditComment() {
    this.comment.edit = true;
    this.commentEdit.setValue(this.comment.content);
  }

  onEditSubcomment(subComment: any) {
    this.subCommentEdit.setValue(subComment.content);
    subComment.edit = true;
  }

  onDeleteComment(commentId: number) {
    this.productService
      .deleteComment(commentId)
      .subscribe(() => this.delete.emit());
  }

  onDeleteSubComment(subCommentId: number, index: number) {
    this.productService
      .deleteComment(subCommentId)
      .subscribe(() => this.comment.subComments.splice(index, 1));
  }

  onAddSubComment(form: NgForm) {
    if (form.invalid) return;
    let data = {
      userId: this.userId,
      productId: this.comment.productId,
      commentId: this.comment.id,
      content: form.value.content,
    };
    this.productService.createComment(data).subscribe((res) => {
      this.comment.subComments.unshift(res);
      form.reset();
    });
  }

  onUpdate(comment: any, form: any) {
    if (form.invalid) return;
    let data = {
      content: form.value,
    };
    this.productService
      .updateComment(comment.id, data)
      .subscribe((res: any) => {
        comment.content = res.content;
        comment.edit = false;
      });
  }
}
