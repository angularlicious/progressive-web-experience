import { BusinessActionBase } from './business-action-base';
import { Observable, of } from 'rxjs';
import { ValidationContext, IsTrue } from '@angularlicious/rules-engine';
import { Severity } from '@angularlicious/logging';

export class IsGoodAction<T> extends BusinessActionBase<T> {
  isGood: boolean;
  constructor(isGoodInput: boolean) {
    super('IsGoodAction');
    this.isGood = isGoodInput;
  }

  preValidateAction(): Observable<ValidationContext> {
    this.loggingService.log(this.actionName, Severity.Information, `Preparing to determine if things are good.`);
    // this.validationContext.addRule(new IsTrue('IsGoodRule', 'Things are not good', this.isGood, true));

    return of(this.validationContext);
  }

  performAction() {
    const result: any = false;
    this.response = of(result);
  }
}
