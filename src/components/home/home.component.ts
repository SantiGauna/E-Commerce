import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { WineService } from '../../services/wine.service';
import { SearchComponent } from '../search/search.component';
import { FilterComponent } from '../filter/filter.component';
import { ProductCardComponent } from '../product-card/product-card.component';
import { PaymentComponent } from '../payment/payment.component';
import { Observable } from 'rxjs';
import { Wine } from '../../models/wine.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    SearchComponent,
    FilterComponent,
    ProductCardComponent,
    PaymentComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  private wineService = inject(WineService);

  filteredWines$: Observable<Wine[]> = this.wineService.getFilteredWines();

  ngOnInit(): void {
    // Inicializar con todos los vinos
    this.wineService.updateFilters({});
  }

  scrollTo(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}