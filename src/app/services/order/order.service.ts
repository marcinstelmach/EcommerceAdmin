import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_ORDERS} from '../../constants/enpoints';
import {Order} from '../../models/order-interface';

@Injectable()
export class OrderService {
  constructor(private http: HttpClient) {
  }

  getFiltered(take = 10, id?, dateFrom?, dateTo?, isShipped?, isPayed?, isClosed?): Observable<any> {
    let url = `${API_ORDERS}?take=${take}`;

    if (id !== undefined) {
      url += `&id=${id}`;
    }
    if (dateFrom !== undefined) {
      url += `&dateFrom=${dateFrom}`;
    }
    if (dateTo !== undefined) {
      url += `&dateTo=${dateTo}`;
    }
    if (isShipped !== undefined) {
      url += `&isShipped=${isShipped}`;
    }
    if (isPayed !== undefined) {
      url += `&isPayed=${isPayed}`;
    }
    if (isClosed !== undefined) {
      url += `&isClosed=${isClosed}`;
    }

    return this.http.get(url);
  }

  get(id: string): Observable<any> {
    return this.http.get(`${API_ORDERS}/${id}`);
  }

  update(order: Order): Observable<any> {
    const data = {
      payed: order.isPayed,
      shipped: order.isShipped,
      closed: order.isClosed
    };

    return this.http.put(`${API_ORDERS}/${order.id}`, data);
  }

  // private setUrlNull(url: string): string {
  //   url = url.replace(new RegExp('undefined', 'g'), '%00');
  //   return url;
  // }
}

