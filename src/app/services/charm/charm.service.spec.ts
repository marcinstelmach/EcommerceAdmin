import { TestBed, inject } from '@angular/core/testing';

import { CharmService } from './charm.service';

describe('CharmService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CharmService]
    });
  });

  it('should be created', inject([CharmService], (service: CharmService) => {
    expect(service).toBeTruthy();
  }));
});
