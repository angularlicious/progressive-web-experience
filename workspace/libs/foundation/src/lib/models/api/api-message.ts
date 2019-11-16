import { ApiMessageSeverity } from './api-message-severity.enum';

export class ApiMessage {
  id?: string;
  statusCode?: string;
  message: string;
  severity: ApiMessageSeverity;
  isDisplayable: boolean;

  /**
   * Use to create a new [ApiErrorMessage]
   * @param message The error from the API.
   * @param displayable Use to indicate if the error should be displayed to the user.
   * @param id An optional identifier for the error.
   */
  constructor(message: string, displayable: boolean, id: string | null) {
    this.message = message;
    this.isDisplayable = displayable;
    if (id) {
      this.id = id;
    }
  }
}
