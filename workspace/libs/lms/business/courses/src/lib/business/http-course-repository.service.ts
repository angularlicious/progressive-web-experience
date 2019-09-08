import { Injectable, Inject } from '@angular/core';
import { ServiceBase, ApiResponse } from '@angularlicious/foundation';
import { LoggingService } from '@angularlicious/logging';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpService, HttpRequestMethod } from '@angularlicious/http-service';

@Injectable()
export class HttpCourseRepositoryService extends ServiceBase {
  baseUrl = 'http://mybackend.com/api/'; //@@TODO: USE CONFIGURATION HERE;
  noCredentials = false;
  credentialsRequired = true;

  constructor(@Inject(HttpClient) public http: HttpClient, @Inject(HttpService) public httpService: HttpService, loggingService: LoggingService) {
    super('HttpCourseRepositoryService', loggingService);
  }

  retrieveLatestCourses<T>(): Observable<ApiResponse<T>> {
    const requestUrl = this.baseUrl.concat('courses/latest');
    const options = this.httpService.createOptions(HttpRequestMethod.get, this.httpService.createHeader(), requestUrl, null, this.noCredentials);
    return this.httpService.execute<T>(options);
  }
}
