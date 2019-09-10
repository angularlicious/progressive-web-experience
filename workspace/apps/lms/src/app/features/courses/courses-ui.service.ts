import { Injectable } from '@angular/core';
import { ReplaySubject, Observable, Subscription, BehaviorSubject } from 'rxjs';
import { VideoCourse } from '@angularlicious/lms-common';
import { ServiceBase, ApiResponse, SuccessApiResponse } from '@angularlicious/foundation';
import { LoggingService, Severity } from '@angularlicious/logging';

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
export class CoursesUIService extends ServiceBase {
  video$: BehaviorSubject<VideoCourse> = new BehaviorSubject<VideoCourse>(null);
  private videos: VideoCourse[] = []; // use to manage video state;

  latestCoursesSubscription: Subscription;
  latestCourses$: ReplaySubject<VideoCourse[]> = new ReplaySubject<VideoCourse[]>(1);
  showVideos$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  showVideo$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private coursesService: CoursesService, loggingService: LoggingService) {
    super('CoursesComponentService', loggingService);
    this.initialize();
  }

  /**
   * Use to retrieve a video from the collection.
   * @param videoId
   */
  retrieveVideo(videoId: string) {
    this.loggingService.log(this.serviceName, Severity.Information, `Setting [showVideo$] to [false]`);
    this.showVideo$.next(false);

    this.loggingService.log(this.serviceName, Severity.Information, `Preparing to find video in collection.`);
    const targetVideo = this.videos.find(item => item.id === videoId);
    if (targetVideo) {
      this.loggingService.log(this.serviceName, Severity.Information, `Target video found: ${targetVideo.title}.`);
      this.showVideo$.next(true);
      this.video$.next(targetVideo);
    }
  }

  private initialize() {
    this.showVideos$.next(false);
    this.showVideo$.next(false);

    this.coursesService.retrieveLatestVideoCourses<VideoCourse[]>().subscribe(
      response => this.handleLatestCoursesResponse<Observable<VideoCourse[]>>(response),
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
  private handleLatestCoursesResponse<T>(response: VideoCourse[]): void {
    this.loggingService.log(this.serviceName, Severity.Information, `Preparing to handle request for latest videos.`);
    if (response && response.length > 0) {
      this.loggingService.log(this.serviceName, Severity.Information, `Processing valid response with [${response.length}] videos.`);
      this.videos = response;
      this.latestCourses$.next(this.videos);
      this.showVideos$.next(true);
    } else {
      //@@WORK HANDLE/SHOW/DISPLAY RESPONSE MESSAGES/ERROR(S) ETC.
      this.loggingService.log(this.serviceName, Severity.Warning, `The response does not contain any videos.`);
      this.showVideos$.next(false);
      this.latestCourses$.next([]);
    }
  }
}
