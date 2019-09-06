import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { LatestCoursesComponent } from './latest-courses/latest-courses.component';

@NgModule({
  declarations: [LatestCoursesComponent],
  exports: [LatestCoursesComponent],
  imports: [CommonModule, CoursesRoutingModule],
})
export class CoursesModule {}
