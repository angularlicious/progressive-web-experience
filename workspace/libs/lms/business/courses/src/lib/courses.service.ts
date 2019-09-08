import { Injectable, Inject } from '@angular/core';
import { ServiceBase } from '@angularlicious/foundation';
import { LoggingService } from '@angularlicious/logging';
import { Observable } from 'rxjs';
import { VideoCourse } from '@angularlicious/lms-common';
import { BusinessProviderService } from './business/business-provider.service';

@Injectable()
export class CoursesService extends ServiceBase {
  constructor(@Inject(BusinessProviderService) private businessProvider: BusinessProviderService, loggingService: LoggingService) {
    super('CoursesService', loggingService);

    this.initializeBusinessProvider();
  }

  initializeBusinessProvider() {
    this.businessProvider.serviceContext = this.serviceContext;
  }

  retrieveLatestVideoCourses(): Observable<VideoCourse[]> {
    return this.businessProvider.retrieveLatestVideoCourses();
  }
}
