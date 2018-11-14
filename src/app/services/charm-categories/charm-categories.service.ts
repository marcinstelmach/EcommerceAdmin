import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from './../auth/auth.service';
import { API_CHARMS_CATEGORY_URL } from 'app/constants/enpoints';

@Injectable()
export class CharmCategoriesService {
  token = '';

  constructor(private http: HttpClient,
    private authService: AuthService) {
    this.token = this.authService.getToken();
  }

  public addCharmCategory(data): Observable<any> {
    const options = this.setOptions();

    return this.http.post(API_CHARMS_CATEGORY_URL, data , options);
  }

  public getCategories(): Observable<any> {
    const options = this.setOptions();

    return this.http.get('/api/CharmCategories', options);
  }

  public getCategoriesById(id: string): Observable<any> {
    const options = this.setOptions();

    return this.http.get('/api/CharmCategories/' + id, options);
  }


  public deleteCategory(id: number): Observable<any> {
    const options = this.setOptions();

    return this.http.delete('/api/CharmCategories/' + id, options);
  }

  private setOptions(): any {
    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      })
    };

    return options;
  }
}
