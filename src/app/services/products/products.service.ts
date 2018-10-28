import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_PRODUCTS_URL } from 'app/constants/enpoints';
import { ProductData } from 'app/models/product.interface';

@Injectable()
export class ProductsService {
  private token: string = '';

  constructor(private http: HttpClient,
    private authService: AuthService) {
    this.token = this.authService.getToken();
  }

  public fetchProducts(): Observable<any> {
    const options = {
      headers: this.getHeadersOptions()
    };

    return this.http.get(API_PRODUCTS_URL, options);
  }

  public addNewPropduct(product: ProductData): Observable<any> {
    const options = {
      headers: this.getHeadersOptions()
    };

    return this.http.post(API_PRODUCTS_URL, product, options);
  }

  public getPropductById(id: number): Observable<any> {
    const options = {
      headers: this.getHeadersOptions()
    };

    return this.http.get(API_PRODUCTS_URL + '/' + id, options);
  }

  public getPropductsByCategoryId(categoryId: number): Observable<any> {
    const options = {
      headers: this.getHeadersOptions()
    };

    return this.http.get(API_PRODUCTS_URL + '/' + categoryId, options);
  }

  private getHeadersOptions(): HttpHeaders {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    return headers;
  }
}
