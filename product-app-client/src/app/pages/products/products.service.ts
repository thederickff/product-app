import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Product } from './products.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private mProducts = new BehaviorSubject<Product[]>([]);
  private baseUrl = 'http://localhost:8080/products';

  get products(): Observable<Product[]> {
    return this.mProducts.asObservable();
  }

  constructor(private http: HttpClient) { }

  fetchProducts(): Observable<any> {
    return this.http.get<Product[]>(this.baseUrl)
    .pipe(
      tap(products => {
        this.mProducts.next(products);
      })
    );
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }
}
