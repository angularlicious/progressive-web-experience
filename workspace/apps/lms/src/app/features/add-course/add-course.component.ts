import { Component, OnInit } from '@angular/core';
import { ComponentBase } from '@angularlicious/foundation';
import { LoggingService } from '@angularlicious/logging';
import { Router } from '@angular/router';

@Component({
  selector: 'lms-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css'],
})
export class AddCourseComponent extends ComponentBase implements OnInit {
  constructor(loggingService: LoggingService, router: Router) {
    super('AddCourseComponent', loggingService, router);
  }

  ngOnInit() {}
}
