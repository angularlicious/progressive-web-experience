import { IConfiguration, ILoggingConfig, IErrorHandingConfig, ILogglyConfig } from '@angularlicious/configuration';

export class AppConfig implements IConfiguration {
  applicationName: 'Angularlicious.LMS';
  version: '2.0.0';
  loggingConfig: ILoggingConfig = {
    applicationName: this.applicationName,
    isProduction: false,
  };
  errorHandlingConfig: IErrorHandingConfig = {
    applicationName: this.applicationName,
    includeDefaultErrorHandling: true,
  };
  logglyConfig: ILogglyConfig = {
    applicationName: this.applicationName,
    apiKey: '01e4b3aa-f301-43e7-bf60-40ba5d0729d4',
    sendConsoleErrors: true,
  };
}
