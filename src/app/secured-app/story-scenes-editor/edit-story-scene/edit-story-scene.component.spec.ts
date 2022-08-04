import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStorySceneComponent } from './edit-story-scene.component';

describe('EditStorySceneComponent', () => {
  let component: EditStorySceneComponent;
  let fixture: ComponentFixture<EditStorySceneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditStorySceneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStorySceneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
