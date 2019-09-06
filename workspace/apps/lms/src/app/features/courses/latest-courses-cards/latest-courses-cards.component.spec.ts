import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestCoursesCardsComponent } from './latest-courses-cards.component';

describe('LatestCoursesCardsComponent', () => {
  let component: LatestCoursesCardsComponent;
  let fixture: ComponentFixture<LatestCoursesCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LatestCoursesCardsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestCoursesCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
