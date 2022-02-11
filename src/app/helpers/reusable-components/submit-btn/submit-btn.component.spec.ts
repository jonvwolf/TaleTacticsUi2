import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitBtnComponent } from './submit-btn.component';

describe('SubmitBtnComponent', () => {
  let component: SubmitBtnComponent;
  let fixture: ComponentFixture<SubmitBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitBtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
