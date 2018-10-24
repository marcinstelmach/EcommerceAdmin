import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {UserForCreation} from '../models/userForCreation';
import {Observable} from 'rxjs';
import {UserForLogin} from '../models/userForLogin';
import {UserForDisplay} from '../models/userForDisplay';
import {TokenModel} from '../models/tokenModel';
import {environment} from '../../environments/environment';

@Injectable()
export class UserService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.API_URL + 'users/';
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
