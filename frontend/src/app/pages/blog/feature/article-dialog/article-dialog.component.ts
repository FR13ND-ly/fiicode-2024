import { Component, inject } from '@angular/core';
import { BlogService } from '../../../../core/data-access/blog.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe, NgIf } from '@angular/common';
import { MaterialModule } from '../../../../core/feature/material/material.module';
import {
  FormControl,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommentComponent } from '../comment/comment.component';
import { LikedPipe } from '../../../../core/pipes/liked.pipe';
import { UserComponent } from '../../../../core/ui/user/user.component';

@Component({
  selector: 'app-article-dialog',
  standalone: true,
  imports: [
    DatePipe,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    CommentComponent,
    NgIf,
    LikedPipe,
    UserComponent,
  ],
  templateUrl: './article-dialog.component.html',
  styleUrl: './article-dialog.component.scss',
})
export class ArticleDialogComponent {
  blogService = inject(BlogService);
  article = inject(MAT_DIALOG_DATA);

  articleEdit = new FormControl(this.article.content, Validators.required);

  onLike() {
    let data = {
      articleId: this.article.id,
      userId: this.article.userId,
    };
    this.blogService.like(data).subscribe((res) => (this.article.likes = res));
  }

  onAddComment(form: NgForm) {
    if (form.invalid) return;
    let data = {
      articleId: this.article.id,
      userId: this.article.userId,
      content: form.value.content,
    };
    this.blogService.createComment(data).subscribe((res: any) => {
      if (res) this.article.comments.unshift(res);
      form.reset();
    });
  }

  onEdit() {
    if (this.articleEdit.invalid) return;
    let data = {
      content: this.articleEdit.value,
    };
    this.blogService
      .updateArticle(this.article.id, data)
      .subscribe((res: any) => {
        this.article.content = res.content;
        this.article.edit = false;
      });
  }
}
