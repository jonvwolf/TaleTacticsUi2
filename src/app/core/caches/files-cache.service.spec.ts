import { TestBed } from '@angular/core/testing';

import { FilesCacheService } from './files-cache.service';

describe('FilesCacheService', () => {
  let service: FilesCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilesCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
