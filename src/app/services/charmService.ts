import {Injectable} from '@angular/core';
import {GlobalService} from './globalService';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {CharmCategoryService} from './charmCategoryService';
import {Observable} from 'rxjs/Observable';
import {CharmCategoryForDisplay} from '../models/charmCategoryForDisplay';
import {CharmCategoryWithCharms} from '../models/charmCategoryWithCharms';
import {CharmForCreation} from '../models/charmForCreation';

@Injectable()
export class CharmService {
  url: string;

  constructor(private globalService: GlobalService,
              private http: HttpClient) {
    this.url = this.globalService.servicePath + 'charms/';

  }

  addCharm(charm: CharmForCreation): Observable<HttpResponse<CharmCategoryForDisplay>> {
    return this.http.post<CharmCategoryForDisplay>(this.url, charm, {
      headers: {
        'Content-Type': 'application/json'
      }, observe: 'response'
    });
  }

}
