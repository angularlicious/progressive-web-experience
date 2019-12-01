import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FeatureRouteModule } from './feature-route/feature-route.module';
import { IndexComponent } from './index/index.component';
import { UiService } from './ui-service.service';
import { CoursesService, LmsBusinessCoursesModule } from '@angularlicious/lms-core/courses';

@NgModule({
  declarations: [IndexComponent],
  imports: [CommonModule, FeatureRouteModule, LmsBusinessCoursesModule, RouterModule],
  providers: [UiService, CoursesService],
})
export class LmsFeatureCoursesModule {}
