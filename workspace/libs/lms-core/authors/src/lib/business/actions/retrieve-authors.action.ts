import { BusinessActionBase } from './business-action-base';
import { Observable, of } from 'rxjs';
import { ValidationContext } from '@angularlicious/rules-engine';

export class RetrieveAuthorsAction<T> extends BusinessActionBase<T> {
  constructor() {
    super('RetrieveAuthorsAction');
  }

  preValidateAction(): Observable<ValidationContext> {
    // add any business rules here; user must be an admin to retrieve all authors;
    return of(this.validationContext);
  }

  performAction() {
    this.response = this.businessProvider.apiService.retrieveAuthors<T>();
  }
}
