import { Component, OnInit } from '@angular/core';
import { ComponentBase } from '@angularlicious/foundation';
import { LoggingService, Severity } from '@angularlicious/logging';
import { Router, ActivatedRoute } from '@angular/router';
import { CoursesUIService } from '../courses-ui.service';
import { Observable } from 'rxjs';
import { VideoCourse } from '@angularlicious/lms-common';

@Component({
  selector: 'lms-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
})
export class VideoComponent extends ComponentBase implements OnInit {
  videoId: string;
  public readonly showVideo$: Observable<boolean> = this.uiService.showVideo$.asObservable();
  video: VideoCourse;

  constructor(private route: ActivatedRoute, private uiService: CoursesUIService, loggingService: LoggingService, router: Router) {
    super('VideoComponent', loggingService, router);
  }

  ngOnInit() {
    this.uiService.video$.subscribe(video => {
      this.video = video;
    });

    // https://angular.io/api/router/ActivatedRouteSnapshot)
    this.loggingService.log(this.componentName, Severity.Information, `Preparing to retrieve video identifer.`);
    this.videoId = this.route.snapshot.params['id'];
    this.loggingService.log(this.componentName, Severity.Information, `Preparing to retrieve video with identifier: ${this.videoId}`);
    this.uiService.retrieveVideo(this.videoId);
  }
}
