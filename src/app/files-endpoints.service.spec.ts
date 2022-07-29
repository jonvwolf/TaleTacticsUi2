import { TestBed } from '@angular/core/testing';

import { FilesEndpointsService } from './files-endpoints.service';

describe('FilesEndpointsService', () => {
  let service: FilesEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilesEndpointsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
