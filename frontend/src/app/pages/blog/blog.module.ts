import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BlogComponent } from './blog.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      { path: '', component: BlogComponent },
      { path: 'article/:articleId', component: BlogComponent },
    ]),
  ],
})
export class BlogModule {}
