import { Component, OnInit } from '@angular/core';
import { ComponentBase } from '@angularlicious/foundation';
import { LoggingService } from '@angularlicious/logging';
import { Router } from '@angular/router';
import { BehaviorSubject, timer } from 'rxjs';
import { AuthenticationService, User } from '@angularlicious/security';

@Component({
  selector: 'lms-user-image',
  templateUrl: './user-image.component.html',
  styleUrls: ['./user-image.component.css'],
})
export class UserImageComponent extends ComponentBase implements OnInit {
  isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  user$: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  // timer$: BehaviorSubject<Date> = new BehaviorSubject<Date>(new Date(Date.now()));

  constructor(private authService: AuthenticationService, loggingService: LoggingService, router: Router) {
    super('UserImageComponent', loggingService, router);
  }

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.user$.next(user);
      this.isAuthenticated$.next(this.authService.isAuthenticated);
    });

    // const t = timer(1000);
    // t.subscribe(time => {
    //   this.timer$.next(new Date(Date.now()));
    // });
  }
}
