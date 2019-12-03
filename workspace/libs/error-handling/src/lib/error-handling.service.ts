import { Injectable, ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { LoggingService, Severity } from '@angularlicious/logging';
import { ConfigurationService, ErrorHandlingConfig, IConfiguration } from '@angularlicious/configuration';
import { noop } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingService extends ErrorHandler {
  serviceName = 'ErrorHandlingService';
  config: ErrorHandlingConfig;
  hasSettings: boolean;

  constructor(private configService: ConfigurationService, private loggingService: LoggingService) {
    super();

    this.init();
  }

  init() {
    // Use to provide default settings for error handling processing.
    this.config = new ErrorHandlingConfig();
    this.config = {
      applicationName: 'Angular',
      includeDefaultErrorHandling: true,
    };
    this.config.applicationName = 'ErrorHandlerService';
    this.config.includeDefaultErrorHandling = false;
    console.warn(`Application [ErrorHandler] is using default settings`);

    this.configService.settings$.pipe(take(1)).subscribe(settings => this.handleSettings(settings));
  }

  handleSettings(settings: IConfiguration) {
    if (settings && settings.errorHandlingConfig) {
      this.config = settings.errorHandlingConfig;
      this.hasSettings = true;

      this.loggingService.log(this.config.applicationName, Severity.Information, `Application [ErrorHandler] using configuration settings.`);
    }
  }

  /**
   * Use to handle generalized [Error] items or errors from HTTP/Web
   * APIs [HttpErrorResponse].
   *
   * @param error
   */
  handleError(error: Error | HttpErrorResponse): any {
    if (this.config.includeDefaultErrorHandling) {
      // use the [super] call to keep default error handling functionality --> console;
      super.handleError(error);
    }

    if (this.hasSettings) {
      // A. HANDLE ERRORS FROM HTTP
      if (error instanceof HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          // A.1: A client-side or network error occurred. Handle it accordingly.
          const formattedError = `${error.name}; ${error.message}`;
          this.loggingService.log(this.config.applicationName, Severity.Error, `${formattedError}`);
        } else {
          // A.2: The API returned an unsuccessful response (i.e., 400, 401, 403, etc.).
          /**
           * The [HttpService] should return a response that is consumable by the caller
           * of the API. The response should include relevant information and error messages
           * in a format that is known and consumable by the caller of the API.
           */
          noop();
        }
      } else {
        // B. HANDLE A GENERALIZED ERROR FROM THE APPLICATION/CLIENT;
        const formattedError = `${error.name}; ${error.message}`;
        this.loggingService.log(this.config.applicationName, Severity.Error, `${formattedError}`);
      }
    }
  }
}
