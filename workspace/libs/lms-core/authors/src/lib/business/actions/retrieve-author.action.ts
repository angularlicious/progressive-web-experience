import { BusinessActionBase } from './business-action-base';
import { Observable, of } from 'rxjs';
import { ValidationContext } from '@angularlicious/rules-engine';

export class RetrieveAuthorAction<T> extends BusinessActionBase<T> {
  constructor(private authorId: string) {
    super('RetrieveAuthorAction');
  }

  preValidateAction(): Observable<ValidationContext> {
    // validate the input; author identifier must be valid;
    return of(this.validationContext);
  }

  performAction() {
    this.response = this.businessProvider.apiService.retrieveAuthor<T>(this.authorId);
  }
}
