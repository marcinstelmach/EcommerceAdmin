import {AuthService} from '../auth/auth.service';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

import {API_PRODUCTS_URL} from 'app/constants/enpoints';

@Injectable()
export class ProductsService {
  token = '';

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

  public addProduct(product: any): Observable<any> {
    const options = {
      headers: this.getHeadersOptions()
    };

    return this.http.post(API_PRODUCTS_URL, product, options);
  }

  public getProductById(id: number): Observable<any> {
    const options = {
      headers: this.getHeadersOptions()
    };

    return this.http.get(API_PRODUCTS_URL + '/' + id, options);
  }

  public getPropductsByCategoryId(categoryId: string): Observable<any> {
    const options = {
      headers: this.getHeadersOptions()
    };

    return this.http.get(API_PRODUCTS_URL + '/category/' + categoryId, options);
  }

  public deleteProduct(productId: number): Observable<any> {
    const options = {
      headers: this.getHeadersOptions()
    };

    return this.http.delete(API_PRODUCTS_URL + '/' + productId, options);
  }

  private getHeadersOptions(): HttpHeaders {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    return headers;
  }
}
