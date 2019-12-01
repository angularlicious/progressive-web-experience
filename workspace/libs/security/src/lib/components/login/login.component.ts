import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ComponentBase } from '@angularlicious/foundation';
import { LoggingService, Severity } from '@angularlicious/logging';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { User } from '../../models/user.model';
import { AuthenticationService } from '../../authentication.service';
import { AuthProviderDialogComponent } from '../auth-provider-dialog/auth-provider-dialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'angularlicious-security-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends ComponentBase implements OnInit, OnDestroy {
  @Input() user: User;
  @Input() isAuthenticated: boolean;

  private subscription: Subscription;

  constructor(private authenticationService: AuthenticationService, public dialog: MatDialog, loggingService: LoggingService, router: Router, private route: ActivatedRoute) {
    super('LoginComponent', loggingService, router);
  }

  ngOnInit() {
    this.retrieveRedirectUrl();
    this.login();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private retrieveRedirectUrl() {
    this.subscription = this.route.queryParams.subscribe(params => (this.authenticationService.redirectUrl = params['return']));
  }

  private login() {
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
