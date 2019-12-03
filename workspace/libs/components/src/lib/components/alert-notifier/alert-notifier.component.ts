import { Component, OnInit } from '@angular/core';
import { ComponentBase } from '@angularlicious/foundation';
import { LoggingService } from '@angularlicious/logging';
import { Router } from '@angular/router';
import { Notification, NotificationsService } from '@angularlicious/notifications';
import { Observable } from 'rxjs';

@Component({
  selector: 'angularlicious-alert-notifier',
  templateUrl: './alert-notifier.component.html',
  styleUrls: ['./alert-notifier.component.scss'],
})
export class AlertNotifierComponent extends ComponentBase implements OnInit {
  public readonly notification$: Observable<Notification> = this.notificationService.notifications$;

  constructor(private notificationService: NotificationsService, loggingService: LoggingService, router: Router) {
    super('AlertNotifierComponent', loggingService, router);
  }

  ngOnInit() {}
}
