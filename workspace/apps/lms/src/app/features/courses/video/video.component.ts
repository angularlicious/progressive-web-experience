import { Component, OnInit } from '@angular/core';
import { ComponentBase } from '@angularlicious/foundation';
import { LoggingService } from '@angularlicious/logging';
import { Router, ActivatedRoute } from '@angular/router';
import { CoursesComponentService } from '../courses-component.service';
import { BehaviorSubject, ReplaySubject, Subscription } from 'rxjs';
import { VideoCourse } from '@angularlicious/lms-common';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'lms-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
})
export class VideoComponent extends ComponentBase implements OnInit {
  videoId: number;
  video$: BehaviorSubject<VideoCourse> = new BehaviorSubject<VideoCourse>(null);
  showVideo$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  video;

  constructor(private route: ActivatedRoute, private coursesComponentService: CoursesComponentService, loggingService: LoggingService, router: Router) {
    super('VideoComponent', loggingService, router);
  }

  ngOnInit() {
    // https://angular.io/api/router/ActivatedRouteSnapshot
    this.videoId = Number(this.route.snapshot.params['id']);

    // setup the observables;
    // this.coursesComponentService.video$.subscribe(video => {
    //   this.video$.next(video);
    // });
    this.video$ = this.coursesComponentService.video$;
    this.showVideo$ = this.coursesComponentService.showVideo$;

    // retrieve the video from the component service using the identifier;
    this.coursesComponentService.retrieveVideo(this.videoId);
  }
}
