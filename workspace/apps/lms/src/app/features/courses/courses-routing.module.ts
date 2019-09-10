import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LatestCoursesComponent } from './latest-courses/latest-courses.component';
import { VideoComponent } from './video/video.component';

const routes: Routes = [
  {
    path: '',
    component: LatestCoursesComponent,
  },
  {
    path: 'courses/video/:id',
    component: VideoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
