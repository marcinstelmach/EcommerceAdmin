import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_PRODUCTS_CATEGORIES_DISCOUNT} from '../../constants/enpoints';

@Injectable()
export class ProductCategoryDiscountService {

  constructor(private http: HttpClient) {
  }

  public getDiscounts(): Observable<any> {
    return this.http.get(API_PRODUCTS_CATEGORIES_DISCOUNT);
  }

  public updateDiscount(id: string, data: any): Observable<any> {
    return this.http.put(API_PRODUCTS_CATEGORIES_DISCOUNT + '/' + id, data);
  }

  public addDiscount(data: any): Observable<any> {
    return this.http.post(API_PRODUCTS_CATEGORIES_DISCOUNT, data);
  }

  public getCategoriesForDiscount(id: string): Observable<any> {
    return this.http.get(`${API_PRODUCTS_CATEGORIES_DISCOUNT}/${id}/categories`);
  }

  public setCategories(id: string, data: any): Observable<any> {
    return this.http.put(`${API_PRODUCTS_CATEGORIES_DISCOUNT}/${id}/categories`, data);
  }
}
