import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {API_PRODUCTS_URL} from 'app/constants/enpoints';

@Injectable()
export class ProductsService {

  constructor(private http: HttpClient) {
  }

  public fetchProducts(): Observable<any> {
    return this.http.get(API_PRODUCTS_URL);
  }

  public addProduct(product: any): Observable<any> {
    return this.http.post(API_PRODUCTS_URL, product);
  }

  public getProductById(id: number): Observable<any> {
    return this.http.get(API_PRODUCTS_URL + '/' + id);
  }

  public getPropductsByCategoryId(categoryId: string): Observable<any> {
    return this.http.get(API_PRODUCTS_URL + '/category/' + categoryId);
  }

  public updateProduct(id: number, data: any): Observable<any> {
    return this.http.put(API_PRODUCTS_URL + '/' + id, data);
  }

  public deleteProduct(productId: number): Observable<any> {
    return this.http.delete(API_PRODUCTS_URL + '/' + productId);
  }
}
