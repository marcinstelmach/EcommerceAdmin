import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenCategoryDiscountComponent } from './open-category-discount.component';

describe('OpenCategoryDiscountComponent', () => {
  let component: OpenCategoryDiscountComponent;
  let fixture: ComponentFixture<OpenCategoryDiscountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenCategoryDiscountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenCategoryDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
