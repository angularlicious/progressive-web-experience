import { Injectable, Inject } from '@angular/core';
import { BusinessProviderBase, ApiResponse } from '@angularlicious/foundation';
import { LoggingService } from '@angularlicious/logging';
import { VideoCourse, Author, CourseCategory } from '@angularlicious/lms-common';
import { of, Observable } from 'rxjs';
import { HttpCourseRepositoryService } from './http-course-repository.service';
import { RetrieveLatestVideoCoursesAction } from './actions/retrieve-latest-video-courses.action';

/**
 * This is the coordinator of business operations for the core domain module. It will
 * compose business operations using one or more [Business Actions].
 */
@Injectable()
export class BusinessProviderService extends BusinessProviderBase {
  constructor(@Inject(HttpCourseRepositoryService) public httpApiService: HttpCourseRepositoryService, loggingService: LoggingService) {
    super('LmsBusinessCoursesModule', loggingService);
  }

  /**
   * Use to retrieve the current/latest video courses.
   */
  retrieveLatestVideoCourses<T>(): Observable<ApiResponse<T>> {
    const action = new RetrieveLatestVideoCoursesAction<T>();
    action.Do(this);
    return action.response;
  }
}
