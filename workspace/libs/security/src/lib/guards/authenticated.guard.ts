import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication.service';
import { LoggingService, Severity } from '@angularlicious/logging';

@Injectable({
  providedIn: 'root',
})
export class AuthenticatedGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService, private loggingService: LoggingService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authenticationService) {
      this.loggingService.log('AuthenticatedGuard', Severity.Information, `Preparing to determine if user is authenticated.`);
      if (this.authenticationService.isAuthenticated) {
        this.loggingService.log('AuthenticatedGuard', Severity.Information, `The user is authenticated.`);
        return true;
      }
    }
    this.loggingService.log(
      'AuthenticatedGuard',
      Severity.Information,
      `The user is NOT authenticated - access to secure resource is denied.`
    );
    // TODO: ROUTE THE USER TO LOGIN OR ACCESS DENIED PAGE;
    return false;
  }
}
