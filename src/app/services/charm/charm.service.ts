import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {API_CHARMS, API_CHARMS_CATEGORY_URL} from './../../constants/enpoints';
import {Charm} from 'app/models/charm.interface';

@Injectable()
export class CharmService {

  constructor(private http: HttpClient) {
  }

  public getCharms(id: number): Observable<any> {
    const url = `${API_CHARMS_CATEGORY_URL}/${id}${API_CHARMS}`;

    return this.http.get(url);
  }

  public addCharm(charm: Charm): Observable<any> {
    const url = `/api/${API_CHARMS}`;

    return this.http.post(url, charm);
  }

  public updateCharm(charm: Charm): Observable<any> {
    const url = `/api/${API_CHARMS}`;

    return this.http.put(url, charm);
  }
}
