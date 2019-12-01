import { BusinessActionBase } from './business-action-base';
import { ValidationContext } from '@angularlicious/rules-engine';
import { of, Observable } from 'rxjs';

export class RetrieveUsersAction<T> extends BusinessActionBase<T> {
  constructor() {
    super('RetrieveUsersAction');
  }

  preValidateAction(): Observable<ValidationContext> {
    // add any business rules here; user must be an admin to retrieve all authors;
    return of(this.validationContext);
  }

  performAction() {
    this.response = this.businessProvider.apiService.retrieveUsers<T>();
  }
}
