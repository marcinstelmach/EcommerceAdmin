import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeDiscountComponent } from './code-discount.component';

describe('CodeDiscountComponent', () => {
  let component: CodeDiscountComponent;
  let fixture: ComponentFixture<CodeDiscountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeDiscountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
