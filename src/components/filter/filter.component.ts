import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { PRODUCTS } from '../../data/product';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  selectedCategory: string = '';
  categories: string[] = [...new Set(PRODUCTS.map(p => p.category))];

  @Output() categoryChange = new EventEmitter<string>();

  applyFilter() {
    this.categoryChange.emit(this.selectedCategory);
  }
}
