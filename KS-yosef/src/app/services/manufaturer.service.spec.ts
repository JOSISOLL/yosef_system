import { TestBed, inject } from '@angular/core/testing';

import { ManufaturerService } from './manufaturer.service';

describe('ManufaturerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManufaturerService]
    });
  });

  it('should be created', inject([ManufaturerService], (service: ManufaturerService) => {
    expect(service).toBeTruthy();
  }));
});
