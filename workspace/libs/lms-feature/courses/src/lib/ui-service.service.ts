import { Injectable } from '@angular/core';
import { ServiceBase } from '@angularlicious/foundation';
import { LoggingService, Severity } from '@angularlicious/logging';
import { Course } from '@angularlicious/lms-core/common';
import { Subscription, ReplaySubject, Observable } from 'rxjs';
import { CoursesService } from '@angularlicious/lms-core/courses';

@Injectable()
export class UiService extends ServiceBase {
  // use to manage state for the [course] collection and item(s);
  private courses: Course[] = [];

  // setup for [Course] collection Observable
  // latestCoursesSubscription: Subscription;

  private latestCoursesSubject: ReplaySubject<Course[]> = new ReplaySubject<Course[]>(1);
  public readonly latestCourses$: Observable<Course[]> = this.latestCoursesSubject.asObservable();

  private showCoursesSubject: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  public readonly showCourses$: Observable<boolean> = this.showCoursesSubject.asObservable();

  constructor(loggingService: LoggingService, private coursesService: CoursesService) {
    super('UiServiceService', loggingService);

    this.initialize();
  }

  private initialize() {
    this.loggingService.log(this.serviceName, Severity.Information, `Preparing to initialize the [UI] observables.`);
    this.showCoursesSubject.next(false);

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
      this.latestCoursesSubject.next(this.courses);
      this.showCoursesSubject.next(true);
    } else {
      this.loggingService.log(this.serviceName, Severity.Warning, `The response does not contain any videos.`);
      this.showCoursesSubject.next(false);
      this.latestCoursesSubject.next([]);
    }
  }
}
