import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { MaterialModule } from '../material/material.module';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { AsyncPipe } from '@angular/common';
import { ProductService } from '../../data-access/product.service';

@Component({
  selector: 'chips',
  standalone: true,
  imports: [MaterialModule, FormsModule, ReactiveFormsModule, AsyncPipe],
  templateUrl: './chips.component.html',
  styleUrl: './chips.component.scss',
})
export class ChipsComponent implements OnInit {
  @Input() name = '';
  @Input() items: any[] = [];
  @Output() itemsChange = new EventEmitter();
  itemCtrl = new FormControl('');
  filteredItems!: Observable<string[]>;
  productService = inject(ProductService);

  @ViewChild('itemsInput') itemsInput!: ElementRef<HTMLInputElement>;

  allItems: any = [];

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  announcer = inject(LiveAnnouncer);

  constructor() {
    this.filteredItems = this.itemCtrl.valueChanges.pipe(
      startWith(null),
      map((item: string | null) =>
        item ? this._filter(item) : this.allItems.slice()
      )
    );
  }

  ngOnInit() {
    if (this.name == 'Dietary Preferences' || this.name == 'Ingredients') {
      this.productService.getPrefIngredients().subscribe((res) => {
        this.allItems = res;
      });
    } else if (this.name == 'Allergens') {
      this.productService.getPrefAllergens().subscribe((res) => {
        this.allItems = res;
      });
    } else if (this.name == 'Categories') {
      this.productService.getPrefCategories().subscribe((res) => {
        this.allItems = res;
      });
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.items.push({ name: value });
    }

    event.chipInput!.clear();
    this.itemsChange.emit(this.items);
  }

  remove(item: any): void {
    const index = this.items.indexOf(item);

    if (index >= 0) {
      this.items.splice(index, 1);

      this.announcer.announce(`Removed ${item}`);
    }
    this.itemsChange.emit(this.items);
  }

  edit(item: any, event: MatChipEditedEvent) {
    const value = event.value.trim();

    if (!value) {
      this.remove(item);
      this.itemsChange.emit(this.items);
      return;
    }

    const index = this.items.indexOf(item);
    if (index >= 0) {
      this.items[index].name = value;
    }
    this.itemsChange.emit(this.items);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.items.push({ name: event.option.value });
    this.itemsInput.nativeElement.value = '';
    this.itemCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allItems.filter((item: string) =>
      item.toLowerCase().includes(filterValue)
    );
  }
}
