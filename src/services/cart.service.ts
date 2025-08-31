import { Injectable, signal, computed } from '@angular/core';
import { CartItem, Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _cartItems = signal<CartItem[]>([]);

  // Calculo los valores
  cartItems = computed(() => this._cartItems());
  itemCount = computed(() => this._cartItems().reduce((sum, item) => sum + item.quantity, 0));
  total = computed(() => this._cartItems().reduce((sum, item) => sum + (item.product.price * item.quantity), 0));

  addToCart(product: Product): void {
    const currentItems = this._cartItems();
    const existingItemIndex = currentItems.findIndex(item => item.product.id === product.id);

    if (existingItemIndex >= 0) {
      // Actualizo la cantidad si el producto ya existe
      const updatedItems = [...currentItems];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: updatedItems[existingItemIndex].quantity + 1
      };
      this._cartItems.set(updatedItems);
    } else {
      // Agrego el nuevo producto al carrito
      this._cartItems.set([...currentItems, { product, quantity: 1 }]);
    }
  }

  // Elimino un producto del carrito
  removeFromCart(productId: number): void {
    const currentItems = this._cartItems();
    this._cartItems.set(currentItems.filter(item => item.product.id !== productId));
  }

  // Actualizo la cantidad de un producto en el carrito
  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    const currentItems = this._cartItems();
    const updatedItems = currentItems.map(item => 
      item.product.id === productId 
        ? { ...item, quantity }
        : item
    );
    this._cartItems.set(updatedItems);
  }

  // Vacío el carrito
  clearCart(): void {
    this._cartItems.set([]);
  }
}