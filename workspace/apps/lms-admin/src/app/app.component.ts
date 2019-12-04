import { Component } from '@angular/core';
import { ConsoleLoggerService } from '@angularlicious/console-logger';

@Component({
  selector: 'angularlicious-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'lms-admin';

  constructor(private consoleLogger: ConsoleLoggerService) {
    this.consoleLogger.log('THIS WAS AN AWESOME CONFERENCE!');
  }
}
