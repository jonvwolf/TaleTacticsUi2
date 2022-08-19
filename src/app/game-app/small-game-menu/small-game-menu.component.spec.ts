import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallGameMenuComponent } from './small-game-menu.component';

describe('SmallGameMenuComponent', () => {
  let component: SmallGameMenuComponent;
  let fixture: ComponentFixture<SmallGameMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmallGameMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallGameMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
