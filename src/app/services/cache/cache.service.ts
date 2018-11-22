import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_CLEAR_CACHE} from '../../constants/enpoints';
import {Observable} from 'rxjs';

@Injectable()
export class CacheService {
  constructor(private http: HttpClient) {

  }

  public cleanCache(): Observable<any> {
    return this.http.get(API_CLEAR_CACHE);
  }
}
