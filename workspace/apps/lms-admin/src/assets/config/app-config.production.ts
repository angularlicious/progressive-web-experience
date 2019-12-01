import { IConfiguration, IErrorHandingConfig, ILoggingConfig, ILogglyConfig } from '@angularlicious/configuration';
import {} from '@angularlicious/error-handling';

export const AppConfig: IConfiguration = {
  applicationName: 'Angularlicious.LMS',
  loggingConfig: {
    applicationName: 'Angularlicious.LMS',
    isProduction: true,
  },
  errorHandlingConfig: {
    applicationName: 'Angularlicious.LMS',
    includeDefaultErrorHandling: false,
  },
  logglyConfig: {
    applicationName: 'Angularlicious.LMS',
    apiKey: '01e4b3aa-f301-43e7-bf60-40ba5d0729d4',
    sendConsoleErrors: false,
  },
};
