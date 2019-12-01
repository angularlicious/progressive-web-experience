import { BusinessActionBase } from './business-action-base';
import { CourseIsValidRule } from '../rules/course-is-valid.rule';
import { Course } from '@angularlicious/lms-core/common';
import { Observable, of } from 'rxjs';
import { ValidationContext } from '@angularlicious/rules-engine';

export class AddCourseAction<T> extends BusinessActionBase<T> {
  constructor(private course: Course) {
    super('AddCourseAction');
  }

  preValidateAction(): Observable<ValidationContext> {
    this.validationContext.addRule(new CourseIsValidRule('CourseIsNotNull', 'The course information is not valid.', this.course, this.showRuleMessages));

    return of(this.validationContext);
  }

  performAction() {
    this.course.authorId = `authors/SHM5ZFUNFES4KGZ9vG9i`;
    this.response = this.businessProvider.apiService.addCourse<T>(this.course);
  }
}
