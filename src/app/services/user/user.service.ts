import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from '../authService';
import { Observable } from 'rxjs';
import { API_USERS } from 'app/constants/enpoints';
import { UserData } from 'app/models/user.interface';

@Injectable()
export class UserService {
  private token: string = '';

  constructor(private http: HttpClient,
    private authService: AuthService) {
    this.token = this.authService.getToken();
  }
  
  public getUsers(): Observable<any> {
    const options = {
      headers: this.getHeadersOptions()
    };

    return this.http.get(API_USERS, options);
  }

  public addUser(user: UserData): Observable<any> {
    const options = {
      headers: this.getHeadersOptions()
    };

    return this.http.post(API_USERS, user, options);
  }

  public getUserById(id: number): Observable<any> {
    const options = {
      headers: this.getHeadersOptions()
    };

    return this.http.get(API_USERS + '/' + id, options);
  }

  private getHeadersOptions(): HttpHeaders {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    return headers;
  }
}
