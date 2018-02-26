import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {ProductCategoryForCreation} from '../models/productCategoryForCreation';
import {Observable} from 'rxjs/Observable';
import {ProductCategoryForDisplay} from '../models/productCategoryForDisplay';
import {GlobalService} from './globalService';
import {ProductCategoryTreeForDisplay} from '../models/productCategoryTreeForDisplay';

@Injectable()
export class ProductCategoryService {
  private url: string;

  constructor(private http: HttpClient, private global: GlobalService) {
    this.url = global.servicePath + 'productscategory/';
  }

  addCategory(category: ProductCategoryForCreation): Observable<HttpResponse<ProductCategoryForDisplay>> {
    return this.http.post<ProductCategoryForDisplay>(this.url, category, {
      headers: {
        'Content-Type': 'application/json'
      }, observe: 'response'
    });
  }

  getCategoriesTree(): Observable<HttpResponse<ProductCategoryTreeForDisplay[]>> {
    const treeUrl = this.url + 'CategoriesTree';
    return this.http.get<ProductCategoryTreeForDisplay[]>(treeUrl, {
      headers: {
        'Content-Type': 'application/json'
      }, observe: 'response'
    });
  }

  deleteCategory(categoryId): Observable<HttpResponse<any>> {
    const deleteUrl = this.url + categoryId;
    return this.http.delete(deleteUrl, {
      headers: {
        'Content-Type': 'application/json'
      }, observe: 'response'
    });
  }

  getParentCategories(): Observable<HttpResponse<ProductCategoryForDisplay[]>> {
    const categoriesUrl = this.url + 'parent';
    return this.http.get<ProductCategoryForDisplay[]>(categoriesUrl, {
      headers: {
        'Content-Type': 'application/json'
      }, observe: 'response'
    });
  }
}
