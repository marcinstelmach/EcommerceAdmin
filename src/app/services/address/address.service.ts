import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {AddressSendToApi} from 'app/models/address.interface';
import {API_ADDRESSES, API_USERS} from 'app/constants/enpoints';

@Injectable()
export class AddressService {

  constructor(private http: HttpClient) {
  }

  public addUserAddress(userId: number, address: AddressSendToApi): Observable<any> {
    const url = `${API_USERS}/${userId}${API_ADDRESSES}`;

    return this.http.post(url, address);
  }
}
