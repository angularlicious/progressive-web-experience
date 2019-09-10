import { Injectable, Inject } from '@angular/core';
import { ServiceBase, ApiResponse, SuccessApiResponse } from '@angularlicious/foundation';
import { LoggingService, Severity } from '@angularlicious/logging';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '@angularlicious/http-service';
import { VideoCourse, Author, CourseCategory } from '@angularlicious/lms-common';
import { ICourseRepositoryService } from './i-course-repository.service';

@Injectable()
export class HttpCourseRepositoryService extends ServiceBase implements ICourseRepositoryService {
  baseUrl = 'http://mybackend.com/api/'; //@@TODO: USE CONFIGURATION HERE;
  noCredentials = false;
  credentialsRequired = true;

  constructor(@Inject(HttpClient) public http: HttpClient, @Inject(HttpService) public httpService: HttpService, loggingService: LoggingService) {
    super('HttpCourseRepositoryService', loggingService);
  }

  retrieveLatestCourses<T>(): Observable<ApiResponse<T>> {
    this.loggingService.log(this.serviceName, Severity.Information, `Preparing to execute the API call for the latest video courses.`);
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
    course.videoImageUrl = 'http://i3.ytimg.com/vi/E4IocEOK1II/hqdefault.jpg';
    courses.push(course);

    const course2 = new VideoCourse();
    course2.author = new Author('Matt Vaughn');
    course2.author.bio = 'Loves tacos, jazz, and Angular. Building enterprise applications using CLEAN principles and patterns.';
    course2.category = CourseCategory.Angular;
    course2.description =
      'Learn how to use the Angular `DevKit` to create custom schematics that will generate and update code for your Angular applications. Schematics provides the mechanism for enhanced developer workflow that includes consistency and convention. It is the power behind the Angular CLI.';
    course2.id = 2;
    course2.title = 'Angular Schematics for a Better Workflow';
    course2.videoUrl = 'https://youtube.com/embed/-uu_v6bazLs';
    course2.videoImageUrl = 'http://i3.ytimg.com/vi/-uu_v6bazLs/hqdefault.jpg';
    courses.push(course2);

    const course3 = new VideoCourse();
    course3.author = new Author('Matt Vaughn');
    course3.author.bio = 'Loves tacos, jazz, and Angular. Building enterprise applications using CLEAN principles and patterns.';
    course3.category = CourseCategory.Angular;
    course3.description =
      'A short video to reintroduce you to the game changing capabilities of the Angular Workspace. If you or your team needs to be better at sharing and reusing code - then this is for you';
    course3.id = 3;
    course3.title = 'Angular Workspace Reintroduction';
    course3.videoUrl = 'https://youtube.com/embed/E4IocEOK1II';
    course3.videoImageUrl = 'http://i3.ytimg.com/vi/E4IocEOK1II/hqdefault.jpg';
    courses.push(course3);

    const apiResponse = new SuccessApiResponse();
    apiResponse.Data = courses;
    apiResponse.IsSuccess = true;
    apiResponse.Message = `Successfully retrieved latest video courses.`;
    apiResponse.Timestamp = new Date(Date.now());

    return of(apiResponse);

    // const requestUrl = this.baseUrl.concat('courses/latest');
    // const options = this.httpService.createOptions(HttpRequestMethod.get, this.httpService.createHeader(), requestUrl, null, this.noCredentials);
    // return this.httpService.execute<T>(options);
  }
}
