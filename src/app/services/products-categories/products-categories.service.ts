import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {API_PRODUCTS_CATEGORIES_URL} from 'app/constants/enpoints';
import {ProductCategory} from 'app/models/product-category.interface';

@Injectable()
export class ProductsCategoriesService {

  constructor(private http: HttpClient) {
  }

  public fetchProductCategories(): Observable<any> {
    return this.http.get(API_PRODUCTS_CATEGORIES_URL);
  }

  public fetchProductCategoryById(id: string): Observable<any> {
    return this.http.get(API_PRODUCTS_CATEGORIES_URL + '/' + id);
  }

  public addProductCategory(data: ProductCategory): Observable<any> {
    return this.http.post(API_PRODUCTS_CATEGORIES_URL, data);
  }

  public deleteProductCategory(id: string): Observable<any> {
    return this.http.delete(API_PRODUCTS_CATEGORIES_URL + id);
  }

  public updateCategory(id: string, data: any): Observable<any> {
    return this.http.put(`${API_PRODUCTS_CATEGORIES_URL}/${id}`, data);
  }
}
