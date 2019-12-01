import { Component, OnInit, Input } from '@angular/core';
import { ComponentBase } from '@angularlicious/foundation';
import { AuthenticationService, User, AuthProviderDialogComponent } from '@angularlicious/security';
import { LoggingService, Severity } from '@angularlicious/logging';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'angularlicious-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends ComponentBase implements OnInit {
  @Input() user: User;
  @Input() isAuthenticated: boolean;

  constructor(private authenticationService: AuthenticationService, public dialog: MatDialog, loggingService: LoggingService, router: Router) {
    super('LoginComponent', loggingService, router);
  }

  ngOnInit() {}

  login() {
    this.loggingService.log(this.componentName, Severity.Information, `Preparing to load the provider(s) for authentication.`);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.width = '400px';
    dialogConfig.height = '600px';
    dialogConfig.hasBackdrop = true;
    dialogConfig.data = { redirectUrl: '' };

    const dialogRef = this.dialog.open(AuthProviderDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.loggingService.log(this.componentName, Severity.Information, `${result}`, ['security']);
    });
  }

  logout() {
    this.authenticationService.logout();
  }
}
