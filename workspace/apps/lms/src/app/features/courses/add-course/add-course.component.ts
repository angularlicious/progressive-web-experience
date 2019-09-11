import { Component, OnInit } from '@angular/core';
import { ComponentBase } from '@angularlicious/foundation';
import { LoggingService } from '@angularlicious/logging';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CourseCategory } from '@angularlicious/lms-common';

@Component({
  selector: 'lms-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css'],
})
export class AddCourseComponent extends ComponentBase implements OnInit {
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, loggingService: LoggingService, router: Router) {
    super('AddCourseComponent', loggingService, router);
  }

  ngOnInit() {
    // this.formGroup.addControl('day', new FormControl('Mondyay', {
    //   validators: [Validators.required],
    //   updateOn: 'blur'
    // }));

    this.formGroup = this.formBuilder.group({
      category: new FormControl(CourseCategory.Unknown, {
        validators: [Validators.required],
        updateOn: 'blur', // blur|change|submit (options);
      }),
      description: new FormControl(null, [Validators.required, Validators.maxLength(600)]),
      title: new FormControl(null, [Validators.required, Validators.maxLength(120)]),
    });
  }
}
