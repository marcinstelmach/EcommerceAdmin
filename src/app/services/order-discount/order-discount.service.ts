import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {API_ORDER_DISCOUNT} from '../../constants/enpoints';

@Injectable()
export class OrderDiscountService {
  constructor(private http: HttpClient) {
  }

  public getDiscounts(): Observable<any> {
    return this.http.get(API_ORDER_DISCOUNT);
  }

  public updateDiscount(id: string, data: any): Observable<any> {
    return this.http.put(API_ORDER_DISCOUNT + '/' + id, data);
  }

  public addDiscount(data: any): Observable<any> {
    return this.http.post(API_ORDER_DISCOUNT, data);
  }
}
