import { Component, OnInit } from '@angular/core';
import { ComponentBase } from '@angularlicious/foundation';
import { AuthenticationService, User, AuthProviderDialog } from '@angularlicious/security';
import { LoggingService, Severity } from '@angularlicious/logging';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent extends ComponentBase implements OnInit {
  user$: Subscription;
  user: User;
  isAuthenticated = false;

  constructor(private authenticationService: AuthenticationService, public dialog: MatDialog, loggingService: LoggingService, router: Router) {
    super('LoginComponent', loggingService, router);
  }

  ngOnInit() {
    this.user$ = this.authenticationService.user$.subscribe(
      user => this.handleUserUpdate(user),
      error => this.handleServiceErrors(error),
      () => this.finishRequest(`Finished processing user update.`)
    );
  }

  login() {
    this.loggingService.log(this.componentName, Severity.Information, `Preparing to load the provider(s) for authentication.`);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.width = '400px';
    dialogConfig.height = '600px';
    dialogConfig.hasBackdrop = true;
    dialogConfig.data = { redirectUrl: '' };

    const dialogRef = this.dialog.open(AuthProviderDialog, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.loggingService.log(this.componentName, Severity.Information, `${result}`, ['security']);
    });
  }

  logout() {
    this.authenticationService.logout();
  }

  handleUserUpdate(user: User) {
    this.user = user;
    this.isAuthenticated = this.authenticationService.isAuthenticated;
  }
}
