import { TestBed } from '@angular/core/testing';

import { CommandFormHelperService } from './command-form-helper.service';

describe('CommandFormHelperService', () => {
  let service: CommandFormHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommandFormHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
