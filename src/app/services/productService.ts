import {Injectable} from '@angular/core';
import {AuthService} from './authService';
import {GlobalService} from './globalService';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {ProductForCreation} from '../models/productForCreation';
import {Observable} from 'rxjs/Observable';
import {ProductForDisplay} from '../models/productForDisplay';

@Injectable()
export class ProductService {
  url: string;
  public token: string;

  constructor(private globalService: GlobalService,
              private http: HttpClient,
              private authService: AuthService) {
    this.url = this.globalService.servicePath + 'products/';
    this.token = this.authService.getToken();

  }

  addProduct(productForCreation: ProductForCreation): Observable<HttpResponse<ProductForDisplay>> {
    return this.http.post<ProductForDisplay>(this.url, productForCreation, {
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json'
      }, observe: 'response'
    });
  }
}
