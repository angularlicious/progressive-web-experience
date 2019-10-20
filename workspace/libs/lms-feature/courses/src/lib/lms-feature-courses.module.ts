import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FeatureRouteModule } from './feature-route/feature-route.module';

@NgModule({
  imports: [CommonModule, FeatureRouteModule],
})
export class LmsFeatureCoursesModule {}
