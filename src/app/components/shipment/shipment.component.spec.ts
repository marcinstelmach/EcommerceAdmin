import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentComponent } from './shipment.component';

describe('ShipmentComponent', () => {
  let component: ShipmentComponent;
  let fixture: ComponentFixture<ShipmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
