import { Injectable } from '@angular/core';
import { ServiceBase } from '@angularlicious/foundation';
import { LoggingService, Severity } from '@angularlicious/logging';
import { ReplaySubject, Observable } from 'rxjs';
import { Notification } from './notification.model';
import { ValidationContext, IsNotNullOrUndefined, StringIsNotNullEmptyRange } from '@angularlicious/rules-engine';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService extends ServiceBase {
  private notificationsSubject: ReplaySubject<Notification> = new ReplaySubject<Notification>(1);
  public readonly notifications$: Observable<Notification> = this.notificationsSubject.asObservable();

  constructor(loggingService: LoggingService) {
    super('NotificationsService', loggingService);
  }

  add(notification: Notification) {
    // validate the notification, if valid...add to list;
    if (this.isValid(notification)) {
      this.loggingService.log(this.serviceName, Severity.Information, `Preparing to publish notification: ${notification.title}`);
      this.notificationsSubject.next(notification);
    }
  }

  /**
   * Use to reset the notifications service.
   */
  reset() {
    this.notificationsSubject.next(null);
  }

  private isValid(notification: Notification): boolean {
    const validationContext = new ValidationContext();
    validationContext
      .addRule(new IsNotNullOrUndefined('NotificationIsValid', 'The notification item cannot be null or undefined.', notification, true))
      .addRule(new StringIsNotNullEmptyRange('TitleIsValid', 'The title is not valid. Must be within 2 and 200 characters.', notification.title, 2, 200, true));

    const isValidNotification = validationContext.renderRules().isValid;
    if (!isValidNotification) {
      return false;
    }
    return isValidNotification;
  }
}
