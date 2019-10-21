import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FeatureRouteModule } from './feature-route/feature-route.module';
import { IndexComponent } from './index/index.component';

@NgModule({
  declarations: [IndexComponent],
  imports: [CommonModule, FeatureRouteModule, RouterModule],
})
export class LmsFeatureCoursesModule {}
