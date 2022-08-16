import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootGameComponent } from './root-game.component';

describe('RootGameComponent', () => {
  let component: RootGameComponent;
  let fixture: ComponentFixture<RootGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RootGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RootGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
