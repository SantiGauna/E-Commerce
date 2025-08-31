import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { PRODUCTS } from '../../data/product';
import { staggerAnimation } from '../../animations/animations';
import { FilterComponent } from '../filter/filter.component';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductCardComponent,FilterComponent],
  animations: [staggerAnimation],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

products: Product[] = PRODUCTS;
  filteredProducts: Product[] = [...PRODUCTS];

  trackByProductId(index: number, product: Product): number {
    return product.id;
  }

  onCategoryChange(category: string) {
    if (category) {
      this.filteredProducts = this.products.filter(p => p.category === category);
    } else {
      this.filteredProducts = [...this.products];
    }
  }
}