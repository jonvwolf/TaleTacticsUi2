import { TestBed } from '@angular/core/testing';

import { StoryFormHelperService } from './story-form-helper.service';

describe('StoryFormHelperService', () => {
  let service: StoryFormHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoryFormHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
