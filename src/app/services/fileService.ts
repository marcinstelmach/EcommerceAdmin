import {Injectable} from '@angular/core';
import {AuthService} from './authService';
import {GlobalService} from './globalService';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {FileForDisplay} from '../models/fileForDisplay';

@Injectable()
export class FileService {
  public token: string;
  private url: string;
  private userId: string;


  constructor(private authService: AuthService, private global: GlobalService, private http: HttpClient) {
    this.userId = this.authService.getUserId();
    this.url = this.global.servicePath + 'users/' + this.userId + '/repositories/';
    this.token = this.authService.getToken();
  }

  getFiles(repositoryId: string, versionId: string): Observable<HttpResponse<FileForDisplay[]>> {
    const url = this.url + repositoryId + '/versions/' + versionId + /files/;
    return this.http.get<FileForDisplay[]>(url, {
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json'
      }, observe: 'response'
    });
  }

  deleteFile(repositoryId: string, versionId: string, fileId: string): Observable<HttpResponse<any>> {
    const myUrl = this.url + repositoryId + '/versions/' + versionId + '/files/' + fileId;
    return this.http.delete(myUrl, {
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json'
      }, observe: 'response'
    });
  }


  downoloadFile(repositoryId: string, versionId: string, fileId: string): any {
    const myUrl = this.url + repositoryId + '/versions/' + versionId + '/files/download/' + fileId;
    return this.http.get(myUrl, {
      responseType: 'blob',
      headers: {'Authorization': 'Bearer ' + this.token}
    })
      .map( res => {
        return new Blob([res]);
      });
  }

  downloadFileInfo(repositoryId: string, versionId: string, fileId: string): Observable<HttpResponse<FileForDisplay>> {
    const myUrl = this.url + repositoryId + '/versions/' + versionId + '/files/' + fileId;
    return this.http.get<FileForDisplay>(myUrl, {
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json'
      }, observe: 'response'
    });
  }

}
