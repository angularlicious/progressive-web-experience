import { async, TestBed } from '@angular/core/testing';
import { MaterialDesignModule } from './material-design.module';

describe('MaterialDesignModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialDesignModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(MaterialDesignModule).toBeDefined();
  });
});
