import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {CharmForCreation} from '../models/charmForCreation';
import {AuthService} from './authService';
import {CharmForDisplay} from '../models/charmForDisplay';
import {environment} from '../../environments/environment';

@Injectable()
export class CharmService {
  url: string;
  public token: string;

  constructor(private http: HttpClient,
              private authService: AuthService) {
    this.url = environment.API_URL + 'charms/';
    this.token = this.authService.getToken();

  }

  addCharm(charm: CharmForCreation): Observable<HttpResponse<CharmForDisplay>> {
    return this.http.post<CharmForDisplay>(this.url, charm, {
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json'
      }, observe: 'response'
    });
  }

  deleteCharm(charmId: number): Observable<HttpResponse<any>> {
    const deleteUrl = this.url + charmId + '/';
    return this.http.delete(deleteUrl, {
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json'
      }, observe: 'response'
    });
  }

}
