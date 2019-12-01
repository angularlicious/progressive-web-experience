import { IErrorHandingConfig } from './i-error-handling-config';

export class ErrorHandlingConfig implements IErrorHandingConfig {
  applicationName: string;
  includeDefaultErrorHandling: boolean;
}
