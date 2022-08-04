import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStorySceneComponent } from './create-story-scene.component';

describe('CreateStorySceneComponent', () => {
  let component: CreateStorySceneComponent;
  let fixture: ComponentFixture<CreateStorySceneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateStorySceneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStorySceneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
