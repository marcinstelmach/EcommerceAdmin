import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_ORDERS} from '../../constants/enpoints';
import {Order, OrderFilter} from '../../models/order-interface';

@Injectable()
export class OrderService {
  constructor(private http: HttpClient) {
  }

  getFiltered(filter: OrderFilter): Observable<any> {
    let url = API_ORDERS;

    if (filter.take !== '') {
      url += `?take=${filter.take}`;
    } else {
      url += '?take=30';
    }
    if (filter.id !== '') {
      url += `&id=${filter.id}`;
    }
    if (filter.dateFrom !== '') {
      url += `&dateFrom=${filter.dateFrom}`;
    }
    if (filter.dateTo !== '') {
      url += `&dateTo=${filter.dateTo}`;
    }
    if (filter.isShipped !== '') {
      url += `&isShipped=${filter.isShipped}`;
    }
    if (filter.isPayed !== '') {
      url += `&isPayed=${filter.isPayed}`;
    }
    if (filter.isClosed !== '') {
      url += `&isClosed=${filter.isClosed}`;
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

