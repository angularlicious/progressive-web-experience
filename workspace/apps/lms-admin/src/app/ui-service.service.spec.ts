import { TestBed } from '@angular/core/testing';

import { UiServiceService } from '../../../../libs/lms-feature/courses/src/lib/ui-service.service';

describe('UiServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UiServiceService = TestBed.get(UiServiceService);
    expect(service).toBeTruthy();
  });
});
