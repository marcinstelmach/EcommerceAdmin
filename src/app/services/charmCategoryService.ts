import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CharmCategoryForCreation } from '../models/charmCategoryForCreation';
import { AuthService } from './authService';
import { API_CHARMS_CATEGORY_URL } from '../constants/enpoints';

@Injectable()
export class CharmCategoryService {
  private url: string;
  private token: string;

  constructor(private http: HttpClient,
              private authService: AuthService) {
    this.token = this.authService.getToken();
  }

  public addCategory(categoryForCreation: CharmCategoryForCreation): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(API_CHARMS_CATEGORY_URL, categoryForCreation, options);
  }

  public getCategories(): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      })
    };

    return this.http.get(API_CHARMS_CATEGORY_URL, options);
  }

  public deleteCategory(categoryId: number): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      })
    };

    return this.http.delete(API_CHARMS_CATEGORY_URL + categoryId, options);
  }

  public getCategoriesWithCharms(): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      })
    };

    return this.http.get(API_CHARMS_CATEGORY_URL + 'GetWithCharms', options);
  }
}
