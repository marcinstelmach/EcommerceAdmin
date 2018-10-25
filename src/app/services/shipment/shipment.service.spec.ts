import { TestBed, inject } from '@angular/core/testing';

import { ShipmentService } from './shipment.service';

describe('ShipmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShipmentService]
    });
  });

  it('should be created', inject([ShipmentService], (service: ShipmentService) => {
    expect(service).toBeTruthy();
  }));
});
