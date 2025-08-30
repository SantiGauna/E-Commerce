import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: Product[] = [];

  addToCart(product: Product) {
    const existing = this.items.find(item => item.id === product.id);
    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }
  }

  getItems(): Product[] {
    return this.items;
  }

  getTotal(): number {
    return this.items.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  }
  clearCart() {
    this.items = [];
  }
}
