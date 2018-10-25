import { TestBed, inject } from '@angular/core/testing';

import { CharmCategoriesService } from './charm-categories.service';

describe('CharmCategoriesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CharmCategoriesService]
    });
  });

  it('should be created', inject([CharmCategoriesService], (service: CharmCategoriesService) => {
    expect(service).toBeTruthy();
  }));
});
