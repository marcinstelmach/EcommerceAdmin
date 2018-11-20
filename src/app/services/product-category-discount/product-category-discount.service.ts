import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_PRODUCTS_CATEGORIES_DISCOUNT} from 'app/constants/enpoints';
import {Observable} from 'rxjs';
import {ProductCategoryDiscountData} from 'app/models/product-category-discount.interface';

@Injectable()
export class ProductCategoryDiscountService {

  constructor(private http: HttpClient) {
  }

  public fetchProductCategoryDiscount(): Observable<any> {
    return this.http.get(API_PRODUCTS_CATEGORIES_DISCOUNT);
  }

  public updateProductCategoryDiscount(data: ProductCategoryDiscountData): Observable<any> {
    return this.http.put(API_PRODUCTS_CATEGORIES_DISCOUNT, data);
  }

  public addProductCategoryDiscount(data: ProductCategoryDiscountData): Observable<any> {
    return this.http.post(API_PRODUCTS_CATEGORIES_DISCOUNT, data);
  }
}
