import {API_LOGIN_URL} from '../../constants/enpoints';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserLoginResponseFromApi} from '../../models/user.interface';

export const TOKEN = 'token';
export const REFRESH_TOKEN = 'refreshToken';
export const EXPIRES = 'expires';
export const USER_ID = 'userId';
export const EMAIL_FIELD = 'email';

@Injectable()
export class AuthService {
  constructor(private httpClient: HttpClient) {
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN);
  }

  public setToken(userData: UserLoginResponseFromApi) {
    localStorage.setItem(TOKEN, userData.token);
    localStorage.setItem(REFRESH_TOKEN, userData.refreshToken);
    localStorage.setItem(EXPIRES, userData.expires);
    localStorage.setItem(USER_ID, userData.userId);
    localStorage.setItem(EMAIL_FIELD, userData.email);
  }

  public getTokenExpirationDate(): number {
    const validTo = localStorage.getItem(EXPIRES);
    return Date.parse(validTo);
  }

  public isTokenExpired(): boolean {
    const token = this.getToken();
    const date = this.getTokenExpirationDate();

    if (!token || date === undefined) return true;

    return date.valueOf() < new Date().valueOf();
  }

  public removeTokens(): void {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    localStorage.removeItem(EXPIRES);
    localStorage.removeItem(USER_ID);
    localStorage.removeItem(EMAIL_FIELD);
  }

  public getUserId(): string {
    return localStorage.getItem(USER_ID);
  }

  public login(email: string, password: string): Observable<any> {
    const data = {email, password};
    const options = this.setupOptions();
    const url = API_LOGIN_URL;

    return this.httpClient.post(url, data, options);
  }

  private setupOptions(): any {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return options;
  }
}
