import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_PRODUCTS_CATEGORIES_URL } from 'app/constants/enpoints';
import { ProductCategoryForm } from 'app/models/product-category.interface';

@Injectable()
export class ProductsCategoriesService {
  private token: string = '';

  constructor(private http: HttpClient,
    private authService: AuthService) {
    this.token = this.authService.getToken();
  }

  public fetchProductCategories(): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      })
    };

    return this.http.get(API_PRODUCTS_CATEGORIES_URL, options);
  }

  public fetchProductCategoryById(id: number): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      })
    };

    return this.http.get(API_PRODUCTS_CATEGORIES_URL + '/' + id, options);
  }

  public addProductCategory(data: ProductCategoryForm): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(API_PRODUCTS_CATEGORIES_URL, data, options);
  }
}
