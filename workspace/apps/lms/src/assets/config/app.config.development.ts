import { IConfiguration, ILogglyConfig, IErrorHandingConfig, ILoggingConfig } from '@angularlicious/configuration';

export class AppConfig implements IConfiguration {
  applicationName: 'BuildMotion';
  version: '2.0.0';
  loggingConfig: ILoggingConfig = {
    applicationName: this.applicationName,
    isProduction: false,
  };
  errorHandlingConfig: IErrorHandingConfig = {
    applicationName: 'Angularlicious.LMS',
    includeDefaultErrorHandling: true,
  };
  logglyConfig: ILogglyConfig = {
    applicationName: 'Angularlicious.LMS',
    apiKey: '01e4b3aa-f301-43e7-bf60-40ba5d0729d4',
    sendConsoleErrors: true,
  };
}
