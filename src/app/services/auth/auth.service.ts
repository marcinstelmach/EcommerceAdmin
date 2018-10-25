import { Injectable } from '@angular/core';
import { UserLoginResponseFromApi } from 'app/models/userForLogin';

export const TOKEN = 'token';
export const REFRESH_TOKEN = 'refreshToken';
export const EXPIRES = 'expires';
export const USER_ID = 'userId';
export const EMAIL = 'email';

@Injectable()
export class AuthService {
  getToken(): string {
    return localStorage.getItem(TOKEN);
  }

  setToken(userData: UserLoginResponseFromApi) {
    localStorage.setItem(TOKEN, userData.token);
    localStorage.setItem(REFRESH_TOKEN, userData.refreshToken);
    localStorage.setItem(EXPIRES, userData.expires);
    localStorage.setItem(USER_ID, userData.userId);
    localStorage.setItem(EMAIL, userData.email);
  }

  getTokenExpirationDate(): number {
    const validTo = localStorage.getItem(EXPIRES);
    return Date.parse(validTo);
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    const date = this.getTokenExpirationDate();

    if (!token || date === undefined) return true;

    return date.valueOf() < new Date().valueOf();
  }

  removeTokens(): void {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    localStorage.removeItem(EXPIRES);
    localStorage.removeItem(USER_ID);
    localStorage.removeItem(EMAIL);
  }
  getUserId(): string {
    return localStorage.getItem(USER_ID);
  }
}
