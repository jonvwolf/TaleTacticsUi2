import { TestBed } from '@angular/core/testing';

import { CommandsEndpointsService } from './commands-endpoints.service';

describe('CommandsEndpointsService', () => {
  let service: CommandsEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommandsEndpointsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
