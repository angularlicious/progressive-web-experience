import { Injectable } from '@angular/core';
import { ReplaySubject, Observable, Subscription } from 'rxjs';
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
  latestCoursesSubscription: Subscription;
  latestCourses$: ReplaySubject<VideoCourse[]> = new ReplaySubject<VideoCourse[]>(1);
  showVideos$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  constructor(private coursesService: CoursesService, loggingService: LoggingService) {
    super('CoursesComponentService', loggingService);
    this.initialize();
  }

  initialize() {
    this.showVideos$.next(false);
    this.latestCoursesSubscription = this.coursesService
      .retrieveLatestVideoCourses()
      .subscribe(courses => this.handleLatestCoursesResponse(courses), error => this.handleError(error), () => this.finishRequest(`Finished request for latest video courses.`));
  }

  handleLatestCoursesResponse(courses: VideoCourse[]): void {
    if (courses && courses.length > 0) {
      this.latestCourses$.next(courses);
      this.showVideos$.next(true);
    } else {
      this.showVideos$.next(false);
      this.latestCourses$.next([]);
    }
  }
}
