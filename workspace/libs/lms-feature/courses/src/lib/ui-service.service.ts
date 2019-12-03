import { Injectable } from '@angular/core';
import { ServiceBase } from '@angularlicious/foundation';
import { LoggingService, Severity } from '@angularlicious/logging';
import { Course } from '@angularlicious/lms-core/common';
import { Subscription, ReplaySubject, Observable } from 'rxjs';
import { CoursesService } from '@angularlicious/lms-core/courses';
import { ServiceContext } from '@angularlicious/rules-engine';
import { NotificationsService, Notification } from '@angularlicious/notifications';

@Injectable()
export class UiService extends ServiceBase {
  // use to manage state for the [course] collection and item(s);
  private courses: Course[] = [];

  private latestCoursesSubject: ReplaySubject<Course[]> = new ReplaySubject<Course[]>(1);
  public readonly latestCourses$: Observable<Course[]> = this.latestCoursesSubject.asObservable();

  private showCoursesSubject: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  public readonly showCourses$: Observable<boolean> = this.showCoursesSubject.asObservable();

  constructor(loggingService: LoggingService, private notifications: NotificationsService, private coursesService: CoursesService) {
    super('UiServiceService', loggingService);

    this.initialize();
  }

  /**
   * Use to add a new [Course] to the database collection.
   * @param course
   */
  addCourse(course: Course) {
    this.notifications.reset();
    this.coursesService
      .addCourse<Course>(course)
      .subscribe(
        response => this.handleAddCourseResponse(response),
        error => this.handleAddCourseErrors(this.coursesService.serviceContext),
        () => this.finishRequest(`Finished processing request to create a new course.`)
      );
  }

  /**
   * Use to retrieve any error messages from the service. Handle by
   * putting messages on the notifications service.
   */
  handleAddCourseErrors(serviceContext: ServiceContext): void {
    const messages = this.retrieveErrorMessages(serviceContext);
    const notification = new Notification('Problem adding new course...', messages);

    this.notifications.add(notification);
  }

  /**
   * Use to handle the response for adding a course.
   */
  handleAddCourseResponse(response: Course): void {
    if (response) {
      this.loggingService.log(this.serviceName, Severity.Information, `Successfully created new course.`, ['Course']);
    }
    {
      this.loggingService.log(this.serviceName, Severity.Warning, `Something is not right, expected a valid course..`, ['Course']);
    }
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
