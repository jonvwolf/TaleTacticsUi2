import { TestBed } from '@angular/core/testing';

import { StoryScenesEndpointsService } from './story-scenes-endpoints.service';

describe('StoryScenesEndpointsService', () => {
  let service: StoryScenesEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoryScenesEndpointsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
