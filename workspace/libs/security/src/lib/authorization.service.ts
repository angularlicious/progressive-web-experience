import { Injectable } from '@angular/core';
import { LoggingService } from '@angularlicious/logging';
import { ServiceBase } from '@angularlicious/foundation';

@Injectable()
export class AuthorizationService extends ServiceBase {
  constructor(loggingService: LoggingService) {
    super('AuthorizationService', loggingService);
  }

  retrieveUsers() {
    // return a list of users from Firebase
  }

  retrieveUser() {
    // retrieve a user from Firebase using the target identifier;
  }
}
