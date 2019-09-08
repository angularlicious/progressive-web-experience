import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpCourseRepositoryService } from './business/http-course-repository.service';
import { HttpService } from '@angularlicious/http-service';
import { BusinessProviderService } from './business/business-provider.service';

@NgModule({
  imports: [CommonModule],
  exports: [],
  providers: [BusinessProviderService, HttpCourseRepositoryService, HttpService],
})
export class LmsBusinessCoursesModule {}
