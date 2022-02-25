import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryScenesEditorComponent } from './story-scenes-editor.component';

describe('StoryScenesEditorComponent', () => {
  let component: StoryScenesEditorComponent;
  let fixture: ComponentFixture<StoryScenesEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoryScenesEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryScenesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
