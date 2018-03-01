import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharmComponent } from './charm.component';

describe('CharmComponent', () => {
  let component: CharmComponent;
  let fixture: ComponentFixture<CharmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
