import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { WineService } from '../../services/wine.service';
import { WineCategory } from '../../models/wine.interface';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSliderModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],


})
export class FilterComponent {
  private wineService = inject(WineService);

  WineCategory = WineCategory;
  selectedCategory: WineCategory | undefined = undefined;
  minPrice = 1000;
  maxPrice = 5000;

  onCategoryChange(): void {
    this.applyFilters();
  }

  onPriceChange(): void {
    this.applyFilters();
  }

  clearFilters(): void {
    this.selectedCategory = undefined;
    this.minPrice = 1000;
    this.maxPrice = 5000;
    this.wineService.updateFilters({});
  }

  formatPrice(value: number): string {
    return `$${value}`;
  }

  private applyFilters(): void {
    this.wineService.updateFilters({
      category: this.selectedCategory,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      searchTerm: this.wineService.getCurrentFilters().searchTerm
    });
  }
}