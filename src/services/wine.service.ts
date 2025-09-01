import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { Wine, FilterOptions } from '../models/wine.interface';
import { WINES_DATA } from '../data/wine.data';

@Injectable({
  providedIn: 'root'
})
export class WineService {
  private winesSubject = new BehaviorSubject<Wine[]>(WINES_DATA);
  private filtersSubject = new BehaviorSubject<FilterOptions>({});

  wines$ = this.winesSubject.asObservable();
  filters$ = this.filtersSubject.asObservable();

  filteredWines$: Observable<Wine[]> = combineLatest([
    this.wines$,
    this.filters$
  ]).pipe(
    map(([wines, filters]) => this.applyFilters(wines, filters))
  );

  constructor() {}

  getAllWines(): Observable<Wine[]> {
    return this.wines$;
  }

  getFilteredWines(): Observable<Wine[]> {
    return this.filteredWines$;
  }

  updateFilters(filters: FilterOptions): void {
    this.filtersSubject.next(filters);
  }

  getCurrentFilters(): FilterOptions {
    return this.filtersSubject.value;
  }

  getWineById(id: number): Wine | undefined {
    return this.winesSubject.value.find(wine => wine.id === id);
  }

  private applyFilters(wines: Wine[], filters: FilterOptions): Wine[] {
    return wines.filter(wine => {
      if (filters.category && wine.category !== filters.category) {
        return false;
      }

      if (filters.minPrice && wine.price < filters.minPrice) {
        return false;
      }

      if (filters.maxPrice && wine.price > filters.maxPrice) {
        return false;
      }

      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        return wine.name.toLowerCase().includes(searchLower) ||
               wine.description.toLowerCase().includes(searchLower) ||
               wine.vineyard.toLowerCase().includes(searchLower);
      }

      return true;
    });
  }
}