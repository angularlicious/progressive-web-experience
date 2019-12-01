import { BusinessActionBase } from './business-action-base';
import { Severity } from '@angularlicious/logging';
import { of, Observable, defer } from 'rxjs';
import { ValidationContext, IsTrue } from '@angularlicious/rules-engine';

export class RetrieveLatestCoursesAction<T> extends BusinessActionBase<T> {
  constructor() {
    super('RetrieveLatestCoursesAction');
  }

  preValidateAction(): Observable<ValidationContext> {
    this.loggingService.log(this.actionName, Severity.Information, `Preparing to validate action.`);
    this.validationContext.addRule(new IsTrue('IsGood', 'This is not good', false, true));

    const self = this;
    defer(async function() {
      return await self.businessProvider.isGoodAsync(false).then(r => r);
    }).subscribe(
      response => {
        self.validationContext.addRule(new IsTrue('IsGoodFromAction', 'REALLY NOT GOOD!!!', response, this.showRuleMessages));
      },
      error => self.validationContext.addRule(new IsTrue('Error', `Error from isGood`, false, true))
    );
    return of(this.validationContext);
  }

  performAction() {
    this.loggingService.log(this.actionName, Severity.Information, `Preparing to perform action business logic.`);
    this.response = this.businessProvider.apiService.retrieveLatestCourses<T>();
  }
}
