import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';
import { VideoCourse } from '@angularlicious/lms-common';
import { ServiceBase } from '@angularlicious/foundation';
import { LoggingService } from '@angularlicious/logging';

import { CoursesService } from '@angularlicious/lms/business/courses';

/**
 * Use this service as a mediator between feature components and the core domain
 * service(s) of the application. This service has the responsibility to support
 * the components in the feature module for state management.
 *
 * It will coordinate the calls to the application's core domain service.
 */
@Injectable({
  providedIn: 'root',
})
export class CoursesComponentService extends ServiceBase {
  latestCourses$: ReplaySubject<VideoCourse> = new ReplaySubject<VideoCourse>(1);

  constructor(private coursesService: CoursesService, loggingService: LoggingService) {
    super('CoursesComponentService', loggingService);
    this.initialize();
  }

  initialize() {
    this.latestCourses$.next(new VideoCourse[0]());
  }
}
