import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../authService';
import { API_CHARMS_CATEGORY_URL } from 'app/constants/enpoints';

@Injectable()
export class CharmCategoriesService {
  private token: string = '';

  constructor(private http: HttpClient,
    private authService: AuthService) {
    this.token = this.authService.getToken();
  }

  public addCharmCategory(name: string): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(API_CHARMS_CATEGORY_URL, { name }, options);
  }
}
