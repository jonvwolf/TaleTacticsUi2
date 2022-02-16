import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecureAppComponent } from './secure-app.component';

describe('SecureAppComponent', () => {
  let component: SecureAppComponent;
  let fixture: ComponentFixture<SecureAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecureAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecureAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
