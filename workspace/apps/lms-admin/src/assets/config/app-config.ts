import { IConfiguration } from '@angularlicious/configuration';
import {} from '@angularlicious/error-handling';

export const AppConfig: IConfiguration = {
  applicationName: 'Angularlicious.LMS',
  loggingConfig: {
    applicationName: 'Angularlicious.LMS',
    isProduction: false,
  },
  errorHandlingConfig: {
    applicationName: 'Angularlicious.LMS',
    includeDefaultErrorHandling: true,
  },
  logglyConfig: {
    applicationName: 'Angularlicious.LMS',
    apiKey: '01e4b3aa-f301-43e7-bf60-40ba5d0729d4',
    sendConsoleErrors: true,
  },
};
