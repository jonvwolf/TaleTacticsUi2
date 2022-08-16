import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameStoryDashboardComponent } from './game-story-dashboard.component';

describe('GameStoryDashboardComponent', () => {
  let component: GameStoryDashboardComponent;
  let fixture: ComponentFixture<GameStoryDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameStoryDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameStoryDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
