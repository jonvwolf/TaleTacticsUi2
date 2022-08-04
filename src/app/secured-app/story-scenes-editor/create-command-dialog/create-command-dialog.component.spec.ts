import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCommandDialogComponent } from './create-command-dialog.component';

describe('CreateCommandDialogComponent', () => {
  let component: CreateCommandDialogComponent;
  let fixture: ComponentFixture<CreateCommandDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCommandDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCommandDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
