import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryDiscountComponent } from './category-discount.component';

describe('CategoryDiscountComponent', () => {
  let component: CategoryDiscountComponent;
  let fixture: ComponentFixture<CategoryDiscountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryDiscountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
