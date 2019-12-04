import { Injectable } from '@angular/core';
import { LoggerConfig } from './logger-config';

@Injectable({
  providedIn: 'root',
})
export class ConsoleLoggerService {
  constructor(private config: LoggerConfig) {}

  log(message: string) {
    console.log(`Hello: ${this.config.name} at ${message}`);
  }
}
