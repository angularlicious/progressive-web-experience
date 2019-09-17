import { Component, OnInit } from '@angular/core';
import { ComponentBase } from '@angularlicious/foundation';
import { LoggingService, Severity } from '@angularlicious/logging';
import { Router } from '@angular/router';
import { CoursesUIService } from '../courses-ui.service';
import { Observable } from 'rxjs';

import { Course } from '@angularlicious/lms-common';

@Component({
  selector: 'lms-latest-courses',
  templateUrl: './latest-courses.component.html',
  styleUrls: ['./latest-courses.component.css'],
})
export class LatestCoursesComponent extends ComponentBase implements OnInit {
  public readonly latestCourses$: Observable<Course[]> = this.courseUiService.latestCourses$.asObservable();
  public readonly showCourses$: Observable<boolean> = this.courseUiService.showCourses$.asObservable();

  constructor(private courseUiService: CoursesUIService, loggingService: LoggingService, router: Router) {
    super('LatestCoursesComponent', loggingService, router);
  }

  ngOnInit() {}
}
