import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShellComponent } from './shell.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ShellComponent,
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./../../../pages/products/products.module').then(
                (m) => m.ProductsModule
              ),
          },
          {
            path: 'blog',
            loadChildren: () =>
              import('./../../../pages/blog/blog.module').then(
                (m) => m.BlogModule
              ),
          },
          {
            path: 'product/:id',
            loadChildren: () =>
              import('./../../../pages/product/product.module').then(
                (m) => m.ProductModule
              ),
          },

          {
            path: 'user',
            loadChildren: () =>
              import('./../../../pages/user/user.module').then(
                (m) => m.UserModule
              ),
          },
          {
            path: 'admin',
            loadChildren: () =>
              import('./../../../pages/admin/admin.module').then(
                (m) => m.AdminModule
              ),
          },
        ],
      },
    ]),
  ],
})
export class ShellModule {}
