import { async, TestBed } from '@angular/core/testing';
import { ConsoleLoggerModule } from './console-logger.module';

describe('ConsoleLoggerModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ConsoleLoggerModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ConsoleLoggerModule).toBeDefined();
  });
});
