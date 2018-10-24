import {Injectable} from '@angular/core';
import {AuthService} from './authService';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {ProductForCreation} from '../models/productForCreation';
import {Observable} from 'rxjs';
import {ProductForDisplay} from '../models/productForDisplay';
import {environment} from '../../environments/environment';

@Injectable()
export class ProductService {
  url: string;
  public token: string;

  constructor(private http: HttpClient,
              private authService: AuthService) {
    this.url = environment.API_URL + 'products/';
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
