import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Edit.OrderComponent } from './edit.order.component';

describe('Edit.OrderComponent', () => {
  let component: Edit.OrderComponent;
  let fixture: ComponentFixture<Edit.OrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Edit.OrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Edit.OrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
