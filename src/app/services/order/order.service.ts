import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_ORDERS} from '../../constants/enpoints';

@Injectable()
export class OrderService {
  constructor(private http: HttpClient) {
  }

  getFiltered(take = 10, id?, dateFrom?, dateTo?, isShipped?, isPayed?, isClosed?): Observable<any> {
    let url = `${API_ORDERS}?take=${take}`;

    if (id !== undefined) {url += `&id=${id}`; }
    if (dateFrom !== undefined) {url += `&dateFrom=${dateFrom}`; }
    if (dateTo !== undefined) {url += `&dateTo=${dateTo}`; }
    if (isShipped !== undefined) {url += `&isShipped=${isShipped}`; }
    if (isPayed !== undefined) {url += `&isPayed=${isPayed}`; }
    if (isClosed !== undefined) {url += `&isClosed=${isClosed}`; }

    return this.http.get(url);
  }

  // private setUrlNull(url: string): string {
  //   url = url.replace(new RegExp('undefined', 'g'), '%00');
  //   return url;
  // }
}

