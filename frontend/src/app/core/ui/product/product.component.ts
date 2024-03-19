import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MaterialModule } from '../../feature/material/material.module';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'product',
  standalone: true,
  imports: [MaterialModule, RouterLink, JsonPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  @Input() product: any;
}
