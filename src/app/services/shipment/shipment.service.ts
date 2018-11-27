import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {API_SHIPMENTS} from 'app/constants/enpoints';

@Injectable()
export class ShipmentService {

  constructor(private http: HttpClient) {
  }

  public getShipments(): Observable<any> {
    return this.http.get(API_SHIPMENTS);
  }

  public getShipmentById(id: string): Observable<any> {
    return this.http.get(API_SHIPMENTS);
  }

  public addShipment(shipment: any): Observable<any> {
    return this.http.post(API_SHIPMENTS, shipment);
  }

  public updateShipment(id: string, data: any): Observable<any> {
    return this.http.put(`${API_SHIPMENTS}/${id}`, data);
  }
}
