import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FeatureRouteModule } from './feature-route/feature-route.module';
import { IndexComponent } from './index/index.component';
import { UiService } from './ui-service.service';
import { CoursesService, LmsBusinessCoursesModule } from '@angularlicious/lms-core/courses';
import { AddCourseComponent } from './components/add-course/add-course.component';

import { SharedModule } from './modules/shared/shared.module';

@NgModule({
  declarations: [IndexComponent, AddCourseComponent],
  imports: [CommonModule, SharedModule, FeatureRouteModule, LmsBusinessCoursesModule, RouterModule],
  providers: [UiService, CoursesService],
})
export class LmsFeatureCoursesModule {}
