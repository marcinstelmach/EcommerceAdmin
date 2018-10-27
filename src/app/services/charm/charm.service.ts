import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../authService';
import { API_CHARMS_CATEGORY_URL, API_CHARMS } from '../../constants/enpoints';
import { CharmObject } from 'app/models/charm.interface';

@Injectable()
export class CharmService {
  private token = '';

  constructor(private http: HttpClient,
    private authService: AuthService) {
    this.token = this.authService.getToken();
  }

  public getCharms(id: number): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      })
    };
    const url = `${API_CHARMS_CATEGORY_URL}/${id}${API_CHARMS}`;

    return this.http.get(url, options);
  }

  public addCharm(id: number, charm: CharmObject): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      })
    };
    const url = `${API_CHARMS_CATEGORY_URL}/${id}${API_CHARMS}`;

    return this.http.post(url, charm, options);
  }
}
