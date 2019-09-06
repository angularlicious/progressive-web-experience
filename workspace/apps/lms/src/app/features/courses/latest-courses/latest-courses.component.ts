import { Component, OnInit } from '@angular/core';
import { ComponentBase } from '@angularlicious/foundation';
import { LoggingService, Severity } from '@angularlicious/logging';
import { Router } from '@angular/router';
import { CoursesComponentService } from '../courses-component.service';
import { BehaviorSubject } from 'rxjs';

import { VideoCourse } from '@angularlicious/lms-common';

@Component({
  selector: 'lms-latest-courses',
  templateUrl: './latest-courses.component.html',
  styleUrls: ['./latest-courses.component.css'],
})
export class LatestCoursesComponent extends ComponentBase implements OnInit {
  latestCourses$: BehaviorSubject<VideoCourse> = new BehaviorSubject<VideoCourse>(null);

  constructor(private coursesComponentService: CoursesComponentService, loggingService: LoggingService, router: Router) {
    super('LatestCoursesComponent', loggingService, router);
  }

  ngOnInit() {
    this.loggingService.log(this.componentName, Severity.Information, `Preparing to run [ngOnInit].`);
    this.latestCourses$ = this.coursesComponentService.latestCourses$;
  }
}
