import {Injectable} from '@angular/core';
import {AuthService} from './authService';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {GlobalService} from './globalService';
import {RepositoryForDisplay} from '../models/repositoryForDisplay';

@Injectable()
export class RepositoryService {
  public token: string;
  private url: string;
  private userId: string;


  constructor(private authService: AuthService, private global: GlobalService, private http: HttpClient) {
    this.userId = this.authService.getUserId();
    this.url = this.global.servicePath + 'users/' + this.userId + '/repositories/';
    this.token = this.authService.getToken();
  }

  getRepositoriesForUser(): Observable<HttpResponse<RepositoryForDisplay[]>> {
    return this.http.get<RepositoryForDisplay[]>(this.url, {
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json'
      }, observe: 'response'
    });
  }

  addRepositoryForUser(data: any): Observable<HttpResponse<RepositoryForDisplay>> {
    return this.http.post<RepositoryForDisplay>(this.url, data, {
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json'
      }, observe: 'response'
    });
  }

  deleteRepositoryForUser(repositoryId: string): Observable<HttpResponse<any>> {
    const myUrl = this.url + repositoryId;
    // console.log(this.url);
    return this.http.delete(myUrl, {
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json'
      }, observe: 'response'
    });
  }


}
