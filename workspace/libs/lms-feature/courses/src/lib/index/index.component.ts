import { Component, OnInit } from '@angular/core';
import { ComponentBase } from '@angularlicious/foundation';
import { Router } from '@angular/router';
import { LoggingService } from '@angularlicious/logging';

@Component({
  selector: 'angularlicious-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent extends ComponentBase implements OnInit {
  constructor(loggingService: LoggingService, router: Router) {
    super('IndexComponent', loggingService, router);
  }

  ngOnInit() {}
}
