import {AuthService} from './../auth/auth.service';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

import {API_PRODUCTS_CATEGORIES_URL} from 'app/constants/enpoints';
import {ProductCategory} from 'app/models/product-category.interface';

@Injectable()
export class ProductsCategoriesService {
  token = '';

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

  public addProductCategory(data: ProductCategory): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(API_PRODUCTS_CATEGORIES_URL, data, options);
  }

  public deleteProductCategory(id: string): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      })
    };

    return this.http.delete(API_PRODUCTS_CATEGORIES_URL + id);
  }

  public updateCategory(id: string, data: any): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      })
    };

    return this.http.put(`${API_PRODUCTS_CATEGORIES_URL}/${id}`, data, options);
  }
}
