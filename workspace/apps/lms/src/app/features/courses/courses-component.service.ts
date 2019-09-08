import { Injectable } from '@angular/core';
import { ReplaySubject, Observable, Subscription } from 'rxjs';
import { VideoCourse } from '@angularlicious/lms-common';
import { ServiceBase, ApiResponse, SuccessApiResponse } from '@angularlicious/foundation';
import { LoggingService } from '@angularlicious/logging';

import { CoursesService } from '@angularlicious/lms/business/courses';

/**
 * Use this service as a mediator between feature module components and the core domain
 * service(s) of the application. This service has the responsibility to support
 * the components in the feature module for state management.
 *
 * It will coordinate the calls to the application's core domain service - the
 * [CoursesService]. The [CoursesService] is a member of the application's core
 * domain module [Courses] - this module implements the core business logic
 * for the domain feature.
 *
 * This service is provided in the feature module. The access is scoped
 * for use by members within the feature module only.
 */
@Injectable()
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
    this.coursesService.retrieveLatestVideoCourses<VideoCourse[]>().subscribe(
      response => this.handleLatestCoursesResponse<ApiResponse<VideoCourse[]>>(response),
      error => this.handleError(error),
      () => {
        this.finishRequest(`Finished request for latest video courses.`);
      }
    );
  }

  handleLatestCoursesResponse<T>(response: ApiResponse<T>): void {
    if (response && response.IsSuccess && response instanceof SuccessApiResponse) {
      this.latestCourses$.next(response.Data);
      this.showVideos$.next(true);
    } else {
      //@@WORK HANDLE/SHOW/DISPLAY RESPONSE MESSAGES/ERROR(S) ETC.
      this.showVideos$.next(false);
      this.latestCourses$.next([]);
    }
  }
}
