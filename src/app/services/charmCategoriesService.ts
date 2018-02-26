import {Injectable} from '@angular/core';
import {CharmCategoryForCreation} from '../models/charmCategoryForCreation';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {GlobalService} from './globalService';
import {CharmCategoryForDisplay} from '../models/charmCategoryForDisplay';

@Injectable()
export class CharmCategoriesService {
  private url = this.global.servicePath + 'CharmsCategory/';

  constructor(private http: HttpClient, private global: GlobalService) {}

  addCategory(categoryForCreation: CharmCategoryForCreation): Observable<HttpResponse<any>> {
    return this.http.post(this.url, categoryForCreation, {
      headers: {
        'Content-Type': 'application/json'
      }, observe: 'response'
    });
  }

  getCategories(): Observable<HttpResponse<[]>> {
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
}
