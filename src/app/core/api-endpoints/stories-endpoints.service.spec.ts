import { TestBed } from '@angular/core/testing';

import { StoriesEndpointsService } from './stories-endpoints.service';

describe('StoriesEndpointsService', () => {
  let service: StoriesEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoriesEndpointsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
