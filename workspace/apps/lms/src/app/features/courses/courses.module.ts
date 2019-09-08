import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { LatestCoursesComponent } from './latest-courses/latest-courses.component';
import { VideoCardComponent } from './video-card/video-card.component';
import { CoursesComponentService } from './courses-component.service';
import { LmsBusinessCoursesModule, CoursesService } from '@angularlicious/lms/business/courses';

@NgModule({
  declarations: [LatestCoursesComponent, VideoCardComponent],
  exports: [LatestCoursesComponent],
  imports: [CommonModule, CoursesRoutingModule, LmsBusinessCoursesModule],
  providers: [CoursesComponentService, CoursesService],
})
export class CoursesModule {}
