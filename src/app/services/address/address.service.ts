import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AddressSendToApi } from 'app/models/address.interface';
import { API_ADDRESSES, API_USERS } from 'app/constants/enpoints';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private token: string = '';

  constructor(private http: HttpClient,
    private authService: AuthService) {
    this.token = this.authService.getToken();
  }

  public addUserAddress(userId: number, address: AddressSendToApi): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      })
    };
    const url = `${API_USERS}/${userId}${API_ADDRESSES}`;

    return this.http.post(url, address, options);
  }
}
