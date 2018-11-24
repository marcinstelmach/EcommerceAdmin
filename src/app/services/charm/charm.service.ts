import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {API_CHARMS} from '../../constants/enpoints';

@Injectable()
export class CharmService {

  constructor(private http: HttpClient) {
  }

  public getCharms(id: number): Observable<any> {
    return this.http.get(`${API_CHARMS}/${id}`);
  }

  public addCharm(charm: any): Observable<any> {
    return this.http.post(API_CHARMS, charm);
  }

  public updateCharm(id: string, charm: any): Observable<any> {
    return this.http.put(`${API_CHARMS}/${id}`, charm);
  }

  public deleteCharm(id: string): Observable<any> {
    return this.http.delete(`${API_CHARMS}/${id}`);
  }
}
