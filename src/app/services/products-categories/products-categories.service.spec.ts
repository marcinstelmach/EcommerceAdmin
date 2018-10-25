import { TestBed, inject } from '@angular/core/testing';

import { ProductsCategoriesService } from './products-categories.service';

describe('ProductsCategoriesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductsCategoriesService]
    });
  });

  it('should be created', inject([ProductsCategoriesService], (service: ProductsCategoriesService) => {
    expect(service).toBeTruthy();
  }));
});
