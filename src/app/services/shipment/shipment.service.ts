import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
 
import { API_SHIPMENTS } from 'app/constants/enpoints';
import { ShipmentData } from 'app/models/shipment.interface';
import { AuthService } from 'app/services/auth/auth.service';

@Injectable()
export class ShipmentService {
  private token: string = '';

  constructor(private http: HttpClient,
    private authService: AuthService) {
    this.token = this.authService.getToken();
  }

  public getShipments(): Observable<any> {
    const options = {
      headers: this.getHeadersOptions()
    };

    return this.http.get(API_SHIPMENTS, options);
  }

  public getShipmentById(id: number): Observable<any> {
    const options = {
      headers: this.getHeadersOptions()
    };

    return this.http.get(API_SHIPMENTS, options);
  }

  public addShipment(shipment: ShipmentData): Observable<any> {
    const options = {
      headers: this.getHeadersOptions()
    };

    return this.http.post(API_SHIPMENTS, shipment, options);
  }

  public updateShipment(shipment: ShipmentData): Observable<any> {
    const options = {
      headers: this.getHeadersOptions()
    };

    return this.http.put(API_SHIPMENTS+'/'+shipment.id, shipment, options);
  }

  private getHeadersOptions(): HttpHeaders {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    return headers;
  }
}
