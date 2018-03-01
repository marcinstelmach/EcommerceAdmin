import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {GlobalService} from './globalService';
import {Observable} from 'rxjs/Observable';
import {CharmCategoryForCreation} from '../models/charmCategoryForCreation';
import {CharmCategoryForDisplay} from '../models/charmCategoryForDisplay';
import {CharmCategoryWithCharms} from '../models/charmCategoryWithCharms';

@Injectable()
export class CharmCategoryService {
  private url: string;

  constructor(private http: HttpClient,
              private globalService: GlobalService) {
    this.url = this.globalService.servicePath + 'charmscategory/';
  }

  addCategory(categoryForCreation: CharmCategoryForCreation): Observable<HttpResponse<any>> {
    return this.http.post(this.url, categoryForCreation, {
      headers: {
        'Content-Type': 'application/json'
      }, observe: 'response'
    });
  }

  getCategories(): Observable<HttpResponse<CharmCategoryForDisplay[]>> {
    return this.http.get<CharmCategoryForDisplay[]>(this.url, {
      headers: {
        'Content-Type': 'application/json'
      }, observe: 'response'
    });
  }

  deleteCategory(categoryId: number): Observable<HttpResponse<any>> {
    return this.http.delete(this.url + categoryId, {
      headers: {
        'Content-Type': 'application/json'
      }, observe: 'response'
    });
  }

  getCategoriesWithCharms(): Observable<HttpResponse<CharmCategoryWithCharms[]>> {
    return this.http.get<CharmCategoryWithCharms[]>(this.url + 'GetWithCharms', {
      headers: {
        'Content-Type': 'application/json'
      }, observe: 'response'
    });
  }
}
