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
import { BlogService } from '../../../../core/data-access/blog.service';
import { DatePipe, NgIf } from '@angular/common';
import { UserComponent } from '../../../../core/ui/user/user.component';
import { LikedPipe } from '../../../../core/pipes/liked.pipe';

@Component({
  selector: 'article-comment',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    NgIf,
    DatePipe,
    ReactiveFormsModule,
    UserComponent,
    LikedPipe,
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  @Input() comment: any;
  @Input() userId: any;
  @Output() delete = new EventEmitter();
  blogService = inject(BlogService);

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
    this.blogService
      .deleteComment(commentId)
      .subscribe(() => this.delete.emit());
  }

  onDeleteSubComment(subCommentId: number, index: number) {
    this.blogService
      .deleteComment(subCommentId)
      .subscribe(() => this.comment.subComments.splice(index, 1));
  }

  onAddSubComment(form: NgForm) {
    if (form.invalid) return;
    let data = {
      userId: this.comment.userId,
      articleId: this.comment.articleId,
      commentId: this.comment.id,
      content: form.value.content,
    };
    this.blogService.createComment(data).subscribe((res) => {
      this.comment.subComments.unshift(res);
      form.reset();
    });
  }

  onUpdate(comment: any, form: any) {
    if (form.invalid) return;
    let data = {
      content: form.value,
    };
    this.blogService.updateComment(comment.id, data).subscribe((res: any) => {
      comment.content = res.content;
      comment.edit = false;
    });
  }

  onLikeComment(comment: any) {
    let data = {
      commentId: comment.id,
      userId: this.userId,
    };
    this.blogService.likeComment(data).subscribe((res) => {
      comment.likes = res;
    });
  }
}
