import { TestBed } from '@angular/core/testing';

import { SecuredAppUiService } from './secured-app-ui.service';

describe('SecuredAppUiService', () => {
  let service: SecuredAppUiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecuredAppUiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
