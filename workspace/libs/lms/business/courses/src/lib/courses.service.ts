import { Injectable } from '@angular/core';
import { ServiceBase } from '@angularlicious/foundation';
import { LoggingService } from '@angularlicious/logging';
import { ReplaySubject, of, Observable } from 'rxjs';
import { VideoCourse, Author, CourseCategory } from '@angularlicious/lms-common';

@Injectable({
  providedIn: 'root',
})
export class CoursesService extends ServiceBase {
  constructor(loggingService: LoggingService) {
    super('CoursesService', loggingService);
  }

  retrieveLatestVideoCourses(): Observable<VideoCourse[]> {
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
