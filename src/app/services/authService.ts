import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {TokenModel} from '../models/tokenModel';
import 'rxjs/add/operator/map';

export const TOKEN_NAME = 'jwt_token';
export const VALID_TO = 'validTo';
export const USER_ID = 'userId';
export const EMAIL = 'email';

@Injectable()
export class AuthService {
  private headers = new HttpHeaders();

  constructor() {
    this.headers.append('Access-Control-Allow-Origin', '*');
    this.headers.append('Access-Control-Allow-Credentials', 'true');
    this.headers.append('Content-Type', 'application/json');
  }

  getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  setToken(tokenModel: TokenModel) {
    localStorage.setItem(TOKEN_NAME, tokenModel.token);
    localStorage.setItem(VALID_TO, tokenModel.validTo);
    localStorage.setItem(USER_ID, tokenModel.userId);
    localStorage.setItem(EMAIL, tokenModel.email);
  }

  getTokenExpirationDate(): number {
    const validTo = localStorage.getItem((VALID_TO));
    return Date.parse(validTo);
  }

  isTokenExpired(token?: string): boolean {
    if (!token) token = this.getToken();
    if (!token) return true;

    const date = this.getTokenExpirationDate();
    if (date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }

  removeTokens(): void {
    localStorage.removeItem(TOKEN_NAME);
    localStorage.removeItem(VALID_TO);
    localStorage.removeItem(USER_ID);
    localStorage.removeItem(EMAIL);
  }
  getUserId(): string {
    return localStorage.getItem(USER_ID);
  }

}
