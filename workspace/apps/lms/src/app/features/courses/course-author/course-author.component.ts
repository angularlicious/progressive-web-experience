import { Component, OnInit, Input } from '@angular/core';
import { Author } from '@angularlicious/lms-common';

@Component({
  selector: 'lms-course-author',
  templateUrl: './course-author.component.html',
  styleUrls: ['./course-author.component.css'],
})
export class CourseAuthorComponent implements OnInit {
  @Input() author: Author;

  authorData: Author;
  constructor() {}

  ngOnInit() {}
}
