import { Component, OnInit, Input } from '@angular/core';
import { VideoCourse } from '@angularlicious/lms-common';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { ComponentBase } from '@angularlicious/foundation';
import { LoggingService, Severity } from '@angularlicious/logging';
import { Router } from '@angular/router';

@Component({
  selector: 'lms-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css'],
})
export class VideoPlayerComponent extends ComponentBase implements OnInit {
  @Input() course: VideoCourse;
  safeUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer, loggingService: LoggingService, router: Router) {
    super('VideoPlayerComponent', loggingService, router);
  }

  ngOnInit() {
    if (this.course && this.course.videoUrl) {
      this.loggingService.log(this.componentName, Severity.Information, `Video input is valid for course: ${this.course.title}`);
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.course.videoUrl);
    } else {
      this.loggingService.log(this.componentName, Severity.Error, `The video course input is not valid. Cannot load course video.`);
    }
  }
}
