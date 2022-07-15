import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnSectionComponent } from './learn-section.component';

describe('LearnSectionComponent', () => {
  let component: LearnSectionComponent;
  let fixture: ComponentFixture<LearnSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
