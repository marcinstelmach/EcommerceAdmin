import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_DISCOUNT} from '../../constants/enpoints';

@Injectable()
export class OrderService {
  constructor(private http: HttpClient) {
  }

  getFiltered(id, dateFrom, dateTo, isShipped, isPayed, isClosed): Observable<any> {
    const url = `${API_DISCOUNT}/${id}/${dateFrom}/${isShipped}/${isPayed}/${isClosed}`;
    return this.http.get(url);
  }
}

