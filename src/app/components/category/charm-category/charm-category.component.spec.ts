import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharmCategoryComponent } from './charm-category.component';

describe('CharmCategoryComponent', () => {
  let component: CharmCategoryComponent;
  let fixture: ComponentFixture<CharmCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharmCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharmCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
