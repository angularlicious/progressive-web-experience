import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LatestCoursesComponent } from './latest-courses/latest-courses.component';

const routes: Routes = [
  {
    path: '',
    component: LatestCoursesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
