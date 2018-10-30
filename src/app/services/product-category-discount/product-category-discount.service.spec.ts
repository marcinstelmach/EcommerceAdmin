import { TestBed, inject } from '@angular/core/testing';

import { ProductCategoryDiscountService } from './product-category-discount.service';

describe('ProductCategoryDiscountService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductCategoryDiscountService]
    });
  });

  it('should be created', inject([ProductCategoryDiscountService], (service: ProductCategoryDiscountService) => {
    expect(service).toBeTruthy();
  }));
});
