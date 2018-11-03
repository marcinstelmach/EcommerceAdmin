import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import {API_PRODUCTS_CATEGORIES_DISCOUNT} from '../../constants/enpoints';
import {ProductCategoryDiscountData} from '../../models/product-category-discount.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryDiscountService {
  private token: string = '';

  constructor(private http: HttpClient,
    private authService: AuthService) {
    this.token = this.authService.getToken();
  }

  public fetchProductCategoryDiscount(): Observable<any> {
    const options = {
      headers: this.getHeadersOptions()
    };

    return this.http.put(API_PRODUCTS_CATEGORIES_DISCOUNT, options);
  }

  public updateProductCategoryDiscount(data: ProductCategoryDiscountData): Observable<any> {
    const options = {
      headers: this.getHeadersOptions()
    };

    return this.http.put(API_PRODUCTS_CATEGORIES_DISCOUNT, data, options);
  }

  public addProductCategoryDiscount(data: ProductCategoryDiscountData): Observable<any> {
    const options = {
      headers: this.getHeadersOptions()
    };

    return this.http.post(API_PRODUCTS_CATEGORIES_DISCOUNT, data, options);
  }

  private getHeadersOptions(): HttpHeaders {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    return headers;
  }
}
