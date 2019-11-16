import { ILoggingConfig } from './config/i-logging-config';
import { IErrorHandingConfig } from './config/i-error-handling-config';
import { ILogglyConfig } from './config/i-loggly-config';

export interface IConfiguration {
  applicationName: string;
  loggingConfig: ILoggingConfig;
  errorHandlingConfig: IErrorHandingConfig;
  logglyConfig: ILogglyConfig;
}
