import { TestBed } from '@angular/core/testing';

import { GamesEndpointsService } from './games-endpoints.service';

describe('GamesEndpointsService', () => {
  let service: GamesEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamesEndpointsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
