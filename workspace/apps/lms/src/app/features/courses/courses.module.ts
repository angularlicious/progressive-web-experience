import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { LatestCoursesComponent } from './latest-courses/latest-courses.component';
import { LatestCoursesCardsComponent } from './latest-courses-cards/latest-courses-cards.component';

@NgModule({
  declarations: [LatestCoursesComponent, LatestCoursesCardsComponent],
  exports: [LatestCoursesComponent],
  imports: [CommonModule, CoursesRoutingModule],
})
export class CoursesModule {}
