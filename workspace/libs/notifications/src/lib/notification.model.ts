import { NotificationType } from './notification-type.enum';

export class Notification {
  title: string;
  messages: string[];
  notificationType: NotificationType;
  publishDate: Date = new Date();

  constructor(title: string, messages: string[]) {
    this.title = title;
    this.messages = messages;
  }
}
