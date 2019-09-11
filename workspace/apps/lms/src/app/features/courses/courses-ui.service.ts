import { Injectable } from '@angular/core';
import { ReplaySubject, Observable, Subscription, BehaviorSubject } from 'rxjs';
import { Course, Video } from '@angularlicious/lms-common';
import { ServiceBase, ApiResponse, SuccessApiResponse } from '@angularlicious/foundation';
import { LoggingService, Severity } from '@angularlicious/logging';

import { CoursesService } from '@angularlicious/lms/business/courses';
import { resolveNaptr } from 'dns';

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
export class CoursesUIService extends ServiceBase {
  course$: BehaviorSubject<Course> = new BehaviorSubject<Course>(null);
  private courses: Course[] = []; // use to manage [course collection] state;

  latestCoursesSubscription: Subscription;
  latestCourses$: ReplaySubject<Course[]> = new ReplaySubject<Course[]>(1);
  showCourses$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  showCourse$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  videos$: ReplaySubject<Video[]> = new ReplaySubject<Video[]>(1);
  showVideos$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private coursesService: CoursesService, loggingService: LoggingService) {
    super('CoursesUIService', loggingService);
    this.initialize();
  }

  /**
   * Use to retrieve a video from the collection.
   * @param courseId
   */
  retrieveCourse(courseId: string) {
    this.loggingService.log(this.serviceName, Severity.Information, `Setting [showCourse$] to [false]`);
    this.showCourse$.next(false);

    this.loggingService.log(this.serviceName, Severity.Information, `Preparing to find course in collection.`);
    const targetCourse = this.courses.find(item => item.id === courseId);
    if (targetCourse) {
      this.loggingService.log(this.serviceName, Severity.Information, `Target course found: ${targetCourse.title}.`);
      this.showCourse$.next(true);
      this.course$.next(targetCourse);

      this.retrieveCourseVideos(targetCourse);
    }
  }
  retrieveCourseVideos(course: Course) {
    this.coursesService
      .retrieveCourseVideos<Video[]>(course)
      .subscribe(response => this.handleCourseVideosResponse(response), error => this.handleError(error), () => this.finishRequest(`Finished request for course videos.`));
  }

  private handleCourseVideosResponse(response: Video[]): void {
    if (response && response.length > 0) {
      this.videos$.next(response);
      this.showVideos$.next(true);
    } else {
      this.showVideos$.next(false);
    }
  }

  private initialize() {
    this.showCourses$.next(false);
    this.showCourse$.next(false);

    this.coursesService.retrieveLatestCourses<Course[]>().subscribe(
      response => this.handleLatestCoursesResponse<Observable<Course[]>>(response),
      error => this.handleError(error),
      () => {
        this.finishRequest(`Finished request for latest video courses.`);
      }
    );
  }

  /**
   * Use to handle the response for the latest courses request.
   * @param response
   */
  private handleLatestCoursesResponse<T>(response: Course[]): void {
    this.loggingService.log(this.serviceName, Severity.Information, `Preparing to handle request for latest videos.`);
    if (response && response.length > 0) {
      this.loggingService.log(this.serviceName, Severity.Information, `Processing valid response with [${response.length}] videos.`);
      this.courses = response;
      this.latestCourses$.next(this.courses);
      this.showCourses$.next(true);
    } else {
      //@@WORK HANDLE/SHOW/DISPLAY RESPONSE MESSAGES/ERROR(S) ETC.
      this.loggingService.log(this.serviceName, Severity.Warning, `The response does not contain any videos.`);
      this.showCourses$.next(false);
      this.latestCourses$.next([]);
    }
  }
}
