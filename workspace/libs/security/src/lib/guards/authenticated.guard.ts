import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, RouterState } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication.service';
import { LoggingService, Severity } from '@angularlicious/logging';

@Injectable({
  providedIn: 'root',
})
export class AuthenticatedGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService, private loggingService: LoggingService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authenticationService) {
      this.loggingService.log('AuthenticatedGuard', Severity.Information, `Preparing to determine if user is authenticated.`);
      if (this.authenticationService.isAuthenticated) {
        this.loggingService.log('AuthenticatedGuard', Severity.Information, `The user is authenticated.`);
        return true;
      }
    }
    this.loggingService.log('AuthenticatedGuard', Severity.Information, `The user is NOT authenticated - access to secure resource is denied.`);
    const url = 'security/login';
    this.router.navigate([url], {
      queryParams: {
        return: state.url,
      },
    });
    return false;
  }
}
