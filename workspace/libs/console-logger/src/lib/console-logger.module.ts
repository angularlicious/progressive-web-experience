import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggerConfig } from './logger-config';

@NgModule({
  imports: [CommonModule],
})
export class ConsoleLoggerModule {
  static forRoot(config: LoggerConfig): ModuleWithProviders {
    return {
      ngModule: ConsoleLoggerModule,
      providers: [
        {
          provide: LoggerConfig,
          useValue: config,
        },
      ],
    };
  }
}
