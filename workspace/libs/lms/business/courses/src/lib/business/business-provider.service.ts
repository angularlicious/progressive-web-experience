import { Injectable, Inject } from '@angular/core';
import { BusinessProviderBase, ApiResponse } from '@angularlicious/foundation';
import { LoggingService } from '@angularlicious/logging';
import { Observable } from 'rxjs';
import { RetrieveLatestVideoCoursesAction } from './actions/retrieve-latest-video-courses.action';
import { FirestoreCourseRepositoryService } from './firestore-course-repository.service';
import { VideoCourse } from '@angularlicious/lms-common';

/**
 * This is the coordinator of business operations for the core domain module. It will
 * compose business operations using one or more [Business Actions].
 */
@Injectable()
export class BusinessProviderService extends BusinessProviderBase {
  constructor(@Inject(FirestoreCourseRepositoryService) public apiService: FirestoreCourseRepositoryService, loggingService: LoggingService) {
    super('LmsBusinessCoursesModule', loggingService);
  }

  /**
   * Use to retrieve the current/latest video courses.
   */
  retrieveLatestVideoCourses<T>(): Observable<T> {
    const action = new RetrieveLatestVideoCoursesAction<T>();
    action.Do(this);
    return action.response;
  }
}
