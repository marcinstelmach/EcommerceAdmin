import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_PRODUCTS_CATEGORIES_DISCOUNT} from 'app/constants/enpoints';
import {Observable} from 'rxjs';
import {ProductCategoryDiscount} from 'app/models/product-category-discount.interface';

@Injectable()
export class ProductCategoryDiscountService {

  constructor(private http: HttpClient) {
  }

  public getDisoounts(): Observable<any> {
    return this.http.get(API_PRODUCTS_CATEGORIES_DISCOUNT);
  }

  public updateDiscount(data: ProductCategoryDiscount): Observable<any> {
    return this.http.put(API_PRODUCTS_CATEGORIES_DISCOUNT, data);
  }

  public addDiscount(data: any): Observable<any> {
    return this.http.post(API_PRODUCTS_CATEGORIES_DISCOUNT, data);
  }
}
