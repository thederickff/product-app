import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

import { Product } from '../../models/products.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseUrl = 'http://localhost:8080/products';

  constructor(private http: HttpClient) { }

  fetchProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  addProduct(product: Product, selectedImage?: File): Observable<Product> {
    let observable = of({});

    if (selectedImage) {
      observable = observable.pipe(
        switchMap(() => {
          if (!product.imageUrl) {
            product.imageUrl = this.randomStr();
          }

          const formData: FormData = new FormData();
          formData.append('pid', product.imageUrl);
          formData.append('file', selectedImage);

          return this.http.post(`http://localhost:8080/images`, formData, {
            responseType: 'text'
          })
        })
      );
    }

    return observable.pipe(
      switchMap(() => {
        return this.http.post<Product>(this.baseUrl, product);
      })
    );
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.baseUrl}/${id}`);
  }

  private randomStr() {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnoprstuvwxyz0123456789';

    for (let i = 0; i < 14; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
  }
}
