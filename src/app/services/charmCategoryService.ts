import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {GlobalService} from './globalService';
import {Observable} from 'rxjs/Observable';
import {CharmCategoryForCreation} from '../models/charmCategoryForCreation';
import {CharmCategoryForDisplay} from '../models/charmCategoryForDisplay';
import {CharmCategoryWithCharms} from '../models/charmCategoryWithCharms';
import {AuthService} from './authService';

@Injectable()
export class CharmCategoryService {
  private url: string;
  private token: string;

  constructor(private http: HttpClient,
              private globalService: GlobalService,
              private authService: AuthService) {
    this.url = this.globalService.servicePath + 'charmscategory/';
    this.token = this.authService.getToken();
  }

  addCategory(categoryForCreation: CharmCategoryForCreation): Observable<HttpResponse<any>> {
    return this.http.post(this.url, categoryForCreation, {
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json'
      }, observe: 'response'
    });
  }

  getCategories(): Observable<HttpResponse<CharmCategoryForDisplay[]>> {
    return this.http.get<CharmCategoryForDisplay[]>(this.url, {
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json'
      }, observe: 'response'
    });
  }

  deleteCategory(categoryId: number): Observable<HttpResponse<any>> {
    return this.http.delete(this.url + categoryId, {
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json'
      }, observe: 'response'
    });
  }

  getCategoriesWithCharms(): Observable<HttpResponse<CharmCategoryWithCharms[]>> {
    return this.http.get<CharmCategoryWithCharms[]>(this.url + 'GetWithCharms', {
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json'
      }, observe: 'response'
    });
  }
}
