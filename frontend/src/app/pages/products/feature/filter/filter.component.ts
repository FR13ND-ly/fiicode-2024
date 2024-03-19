import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MaterialModule } from '../../../../core/feature/material/material.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'filter',
  standalone: true,
  imports: [MaterialModule, FormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent implements OnInit {
  @Input() products: any;
  @Output() filter = new EventEmitter();

  filters: any = {
    brands: [],
    categories: [],
    ingredients: [],
    nutriments: [],
  };

  ngOnInit(): void {
    this.setFilters();
  }

  setFilters() {
    this.products.forEach((el: any) => {
      if (
        !this.filters.brands.some((item: any) => item.name == el.brand) &&
        el.brand
      ) {
        this.filters.brands.push({ name: el.brand, selected: false });
      }
      el.categories.forEach((item: any) => {
        let category = item.name;
        if (
          !this.filters.categories.some((item: any) => item.name == category) &&
          category
        ) {
          this.filters.categories.push({ name: category, selected: false });
        }
      });
      el.ingredients.forEach((item: any) => {
        let ingredient = item.name;
        if (
          !this.filters.ingredients.some(
            (item: any) => item.name == ingredient
          ) &&
          ingredient
        ) {
          this.filters.ingredients.push({ name: ingredient, selected: false });
        }
      });
    });
  }

  onChange() {
    this.filter.emit(this.filters);
  }
}
