import { TestBed } from '@angular/core/testing';

import { CoursesComponentService } from './courses-component.service';

describe('CoursesComponentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CoursesComponentService = TestBed.get(CoursesComponentService);
    expect(service).toBeTruthy();
  });
});
