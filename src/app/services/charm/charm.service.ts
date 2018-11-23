import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {API_CHARMS} from '../../constants/enpoints';
import {Charm} from 'app/models/charm.interface';

@Injectable()
export class CharmService {

  constructor(private http: HttpClient) {
  }

  public getCharms(id: number): Observable<any> {
    return this.http.get(`${API_CHARMS}/${id}`);
  }

  public addCharm(charm: Charm): Observable<any> {
    return this.http.post(API_CHARMS, charm);
  }

  public updateCharm(charm: Charm): Observable<any> {
    return this.http.put(API_CHARMS, charm);
  }
}
