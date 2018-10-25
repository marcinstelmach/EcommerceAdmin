import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import {ProductCategoryForCreation} from '../models/productCategoryForCreation';
import {Observable} from 'rxjs';
import {ProductCategoryForDisplay} from '../models/productCategoryForDisplay';
import {ProductCategoryTreeForDisplay} from '../models/productCategoryTreeForDisplay';
import {AuthService} from './authService';
import { API_PRODUCTS_CATEGORIES_URL } from '../constants/enpoints';

@Injectable()
export class ProductCategoryService {
  private url: string;
  private token: string;

  constructor(private http: HttpClient,
              private authService: AuthService) {
    this.token = this.authService.getToken();
  }

  addCategory(category: ProductCategoryForCreation): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    };

    return this.http.post(API_PRODUCTS_CATEGORIES_URL, category, options);
  }

  getCategoriesTree(): Observable<HttpResponse<ProductCategoryTreeForDisplay[]>> {
    const treeUrl = this.url + 'CategoriesTree';
    return this.http.get<ProductCategoryTreeForDisplay[]>(treeUrl, {
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json'
      }, observe: 'response'
    });
  }

  deleteCategory(categoryId): Observable<HttpResponse<any>> {
    const deleteUrl = this.url + categoryId;
    return this.http.delete(deleteUrl, {
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json'
      }, observe: 'response'
    });
  }

  getParentCategories(): Observable<HttpResponse<ProductCategoryForDisplay[]>> {
    const categoriesUrl = this.url + 'parent';
    return this.http.get<ProductCategoryForDisplay[]>(categoriesUrl, {
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json'
      }, observe: 'response'
    });
  }

  getChildCategories(): Observable<HttpResponse<ProductCategoryForDisplay[]>> {
    const categoriesUrl = this.url + 'child';
    return this.http.get<ProductCategoryForDisplay[]>(categoriesUrl, {
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json'
      }, observe: 'response'
    });
  }
}
