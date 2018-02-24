import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {GlobalService} from './globalService';
import {UserForCreation} from '../models/userForCreation';
import {Observable} from 'rxjs/Observable';
import {UserForLogin} from '../models/userForLogin';
import {UserForDisplay} from '../models/userForDisplay';
import {TokenModel} from '../models/tokenModel';

@Injectable()
export class UserService {
  private url: string;

  constructor(private http: HttpClient, private global: GlobalService) {
    this.url = global.servicePath + 'users/';
  }

  public register(user: UserForCreation): Observable<HttpResponse<UserForDisplay>> {
    return this.http.post<UserForDisplay>(this.url, user, {
      headers: {
        'Content-Type': 'application/json'
      }, observe: 'response'
    });
  }

  public login(user: UserForLogin): Observable<HttpResponse<TokenModel>> {
    return this.http.post<TokenModel>(this.url + 'token/', user, {
      headers: {
        'Content-Type': 'application/json'
      }, observe: 'response'
    });
  }

}
