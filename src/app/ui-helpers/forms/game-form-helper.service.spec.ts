import { TestBed } from '@angular/core/testing';

import { GameFormHelperService } from './game-form-helper.service';

describe('GameFormHelperService', () => {
  let service: GameFormHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameFormHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
