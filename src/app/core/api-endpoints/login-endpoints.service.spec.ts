import { TestBed } from '@angular/core/testing';

import { LoginEndpointsService } from './login-endpoints.service';

describe('ApiEndpointsService', () => {
  let service: LoginEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginEndpointsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
