import { TestBed } from '@angular/core/testing';

import { FileFormHelperService } from './file-form-helper.service';

describe('FileFormHelperService', () => {
  let service: FileFormHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileFormHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
