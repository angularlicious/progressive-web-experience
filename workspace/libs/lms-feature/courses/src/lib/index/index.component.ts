import { Component, OnInit } from '@angular/core';
import { ComponentBase } from '@angularlicious/foundation';
import { Router } from '@angular/router';
import { LoggingService } from '@angularlicious/logging';
import { Observable } from 'rxjs';
import { Course } from '@angularlicious/lms-core/common';
import { UiService } from './../ui-service.service';

@Component({
  selector: 'angularlicious-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent extends ComponentBase implements OnInit {
  public readonly latestCourses$: Observable<Course[]> = this.uiService.latestCourses$;
  public readonly showCourses$: Observable<boolean> = this.uiService.showCourses$;

  constructor(private uiService: UiService, loggingService: LoggingService, router: Router) {
    super('IndexComponent', loggingService, router);
  }

  ngOnInit() {}
}
