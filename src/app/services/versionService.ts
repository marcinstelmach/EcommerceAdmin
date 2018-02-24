import {Injectable} from '@angular/core';
import {AuthService} from './authService';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {GlobalService} from './globalService';
import {VersionForDisplay} from '../models/versionForDisplay';

@Injectable()
export class VersionService {
  public token: string;
  private url: string;
  private userId: string;


  constructor(private authService: AuthService, private global: GlobalService, private http: HttpClient) {
    this.userId = this.authService.getUserId();
    this.url = this.global.servicePath + 'users/' + this.userId + '/repositories/';
    this.token = this.authService.getToken();
  }

  getVersionsForUser(repositoryId: string): Observable<HttpResponse<VersionForDisplay[]>> {
    const url = this.url + repositoryId + '/versions/';
    return this.http.get<VersionForDisplay[]>(url, {
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json'
      }, observe: 'response'
    });
  }

  addVersionForUser(data: any, repositoryId: string): Observable<HttpResponse<VersionForDisplay>> {
    const url = this.url + repositoryId + '/versions/';
    return this.http.post<VersionForDisplay>(url, data, {
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json'
      }, observe: 'response'
    });
  }

  deleteVersionForUser(versionId: string, repositoryId: string): Observable<HttpResponse<any>> {
    const myUrl = this.url + repositoryId + '/versions/' + versionId + '/';
    return this.http.delete(myUrl, {
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json'
      }, observe: 'response'
    });
  }

  changeVersionStatus(versionId: string, repositoryId: string): Observable<HttpResponse<any>> {
    const myUrl = this.url + repositoryId + '/versions/' + versionId + '/';
    return this.http.put(myUrl, null, {
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json'
      }, observe: 'response'
    });
  }

  addBasedVersion(data: any, repositoryId: string, versionBasedId: string): Observable<HttpResponse<VersionForDisplay>> {
    const url = this.url + repositoryId + '/versions/' + versionBasedId + '/';
    return this.http.post<VersionForDisplay>(url, data, {
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json'
      }, observe: 'response'
    });
  }


}
