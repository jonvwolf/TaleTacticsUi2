import { TestBed } from '@angular/core/testing';

import { HorrorMasterHubService } from './horror-master-hub.service';

describe('HorrorMasterHubService', () => {
  let service: HorrorMasterHubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HorrorMasterHubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
