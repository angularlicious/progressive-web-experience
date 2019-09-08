import { Injectable, Inject } from '@angular/core';
import { BusinessProviderBase } from '@angularlicious/foundation';
import { LoggingService } from '@angularlicious/logging';
import { VideoCourse, Author, CourseCategory } from '@angularlicious/lms-common';
import { of } from 'rxjs';
import { HttpCourseRepositoryService } from './http-course-repository.service';

@Injectable()
export class BusinessProviderService extends BusinessProviderBase {
  constructor(@Inject(HttpCourseRepositoryService) public httpApiService: HttpCourseRepositoryService, loggingService: LoggingService) {
    super('LmsBusinessCoursesModule', loggingService);
  }

  /**
   * Use to retrieve the current/latest video courses.
   */
  retrieveLatestVideoCourses(): import('rxjs').Observable<VideoCourse[]> {
    const courses: VideoCourse[] = [];

    const course = new VideoCourse();
    course.author = new Author('Matt Vaughn');
    course.author.bio = 'Loves tacos, jazz, and Angular. Building enterprise applications using CLEAN principles and patterns.';
    course.category = CourseCategory.Angular;
    course.description =
      'A short video to reintroduce you to the game changing capabilities of the Angular Workspace. If you or your team needs to be better at sharing and reusing code - then this is for you';
    course.id = 1;
    course.title = 'Angular Workspace Reintroduction';
    course.videoUrl = 'https://youtube.com/embed/E4IocEOK1II';
    courses.push(course);
    return of(courses);
  }
}
