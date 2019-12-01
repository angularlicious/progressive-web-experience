import { async, TestBed } from '@angular/core/testing';
import { LmsFeatureCoursesModule } from './lms-feature-courses.module';

describe('LmsFeatureCoursesModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [LmsFeatureCoursesModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(LmsFeatureCoursesModule).toBeDefined();
  });
});
