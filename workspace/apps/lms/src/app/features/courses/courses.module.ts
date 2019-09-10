import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { LatestCoursesComponent } from './latest-courses/latest-courses.component';
import { VideoCardComponent } from './video-card/video-card.component';
import { CoursesUIService } from './courses-ui.service';
import { LmsBusinessCoursesModule, CoursesService } from '@angularlicious/lms/business/courses';
import { VideoComponent } from './video/video.component';
import { VideoPlayerComponent } from './video-player/video-player.component';

@NgModule({
  declarations: [LatestCoursesComponent, VideoCardComponent, VideoComponent, VideoPlayerComponent],
  exports: [LatestCoursesComponent],
  imports: [CommonModule, CoursesRoutingModule, LmsBusinessCoursesModule],
  providers: [CoursesUIService, CoursesService],
})
export class CoursesModule {}
