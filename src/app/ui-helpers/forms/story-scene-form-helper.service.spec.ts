import { TestBed } from '@angular/core/testing';

import { StorySceneFormHelperService } from './story-scene-form-helper.service';

describe('StorySceneFormHelperService', () => {
  let service: StorySceneFormHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorySceneFormHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
