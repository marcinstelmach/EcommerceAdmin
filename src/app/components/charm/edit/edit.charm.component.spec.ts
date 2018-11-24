import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCharmComponent } from './edit.charm.component';

describe('EditCharmComponent', () => {
  let component: EditCharmComponent;
  let fixture: ComponentFixture<EditCharmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCharmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCharmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
