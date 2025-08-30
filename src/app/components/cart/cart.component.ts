import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatListModule, MatSnackBarModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  constructor(public cartService: CartService, private snackBar: MatSnackBar) {}

  clearCart() {
    this.cartService.clearCart();
  }

  checkout() {
  const total = this.cartService.getTotal();
  this.snackBar.open(`¡Compra realizada por $${total}!`, 'Cerrar', { duration: 3000 });
  this.cartService.clearCart();
  }
}


// Explicación rápida:

// cartService se inyecta público para poder usarlo directamente en el HTML con bindings.

// clearCart() vacía el carrito.