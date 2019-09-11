import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { LatestCoursesComponent } from './latest-courses/latest-courses.component';
import { CourseCardComponent } from './course-card/course-card.component';
import { CoursesUIService } from './courses-ui.service';
import { LmsBusinessCoursesModule, CoursesService } from '@angularlicious/lms/business/courses';
import { VideoComponent } from './video/video.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { CourseComponent } from './course/course.component';

@NgModule({
  declarations: [AddCourseComponent, LatestCoursesComponent, CourseCardComponent, VideoComponent, VideoPlayerComponent, CourseComponent],
  exports: [LatestCoursesComponent],
  imports: [CommonModule, CoursesRoutingModule, LmsBusinessCoursesModule],
  providers: [CoursesUIService, CoursesService],
})
export class CoursesModule {}
