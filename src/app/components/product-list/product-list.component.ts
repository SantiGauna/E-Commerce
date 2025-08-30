import { Component } from '@angular/core';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatSnackBarModule, FormsModule, MatFormFieldModule, MatInputModule ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  constructor(private cartService: CartService, private snackBar: MatSnackBar) {}

  products: Product[] = [
    { id: 1, name: 'HOLA', price: 100, description: 'Descripción del producto 1', imageUrl: 'https://media.canva.com/v2/mockup-template-rasterize/color0:ffffff/image0:s3%3A%2F%2Ftemplate.canva.com%2FEAF5rS1eSRA%2F1%2F0%2F933w-4gLu2Az7ZQ8.png/mockuptemplateid:FqXFzEXX7/size:L?csig=AAAAAAAAAAAAAAAAAAAAAIEJ6WM4VdYFC8qjx2DoJueO8sgSLWX8sJw6YHoa5U5t&exp=1756643063&osig=AAAAAAAAAAAAAAAAAAAAABk2_-nllrv_4pVJCo7nlvvtGp2tkmZk_5gJC6kYJ_x6&seoslug=remera-frase-de-amor-simple-negro&signer=marketplace-rpc' },
    { id: 2, name: 'SOY CRACK', price: 100, description: 'Descripción del producto 2', imageUrl: 'https://media.canva.com/v2/mockup-template-rasterize/color0:ffffff/image0:s3%3A%2F%2Ftemplate.canva.com%2FEAF5rS1eSRA%2F1%2F0%2F933w-4gLu2Az7ZQ8.png/mockuptemplateid:FqXFzEXX7/size:L?csig=AAAAAAAAAAAAAAAAAAAAAIEJ6WM4VdYFC8qjx2DoJueO8sgSLWX8sJw6YHoa5U5t&exp=1756643063&osig=AAAAAAAAAAAAAAAAAAAAABk2_-nllrv_4pVJCo7nlvvtGp2tkmZk_5gJC6kYJ_x6&seoslug=remera-frase-de-amor-simple-negro&signer=marketplace-rpc' },

  ];

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.snackBar.open(`${product.name} agregado al carrito`, 'Cerrar', {
      duration: 2000,
      panelClass: ['futuristic-snackbar']
    });

  }


  searchTerm: string = '';


  // Getter para productos filtrados
    get filteredProducts(): Product[] {
      console.log('Filtrando productos con término:', this.searchTerm);
      
      if (!this.searchTerm) {
        console.log('Sin término de búsqueda, mostrando todos los productos');
        return this.products;
      }
      
      const filtered = this.products.filter(p => 
        p.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      
      console.log('Productos encontrados:', filtered);
      return filtered;
    }



  

}
