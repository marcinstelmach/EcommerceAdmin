import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {API_SHIPMENTS} from 'app/constants/enpoints';
import {ShipmentData} from 'app/models/shipment.interface';

@Injectable()
export class ShipmentService {

  constructor(private http: HttpClient) {
  }

  public getShipments(): Observable<any> {
    return this.http.get(API_SHIPMENTS);
  }

  public getShipmentById(id: number): Observable<any> {
    return this.http.get(API_SHIPMENTS);
  }

  public addShipment(shipment: ShipmentData): Observable<any> {
    return this.http.post(API_SHIPMENTS, shipment);
  }

  public updateShipment(shipment: ShipmentData): Observable<any> {
    return this.http.put(API_SHIPMENTS + '/' + shipment.id, shipment);
  }
}
