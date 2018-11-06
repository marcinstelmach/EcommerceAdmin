import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAlertComponent } from './delete-alert.component';

describe('DeleteAlertComponent', () => {
  let component: DeleteAlertComponent;
  let fixture: ComponentFixture<DeleteAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
