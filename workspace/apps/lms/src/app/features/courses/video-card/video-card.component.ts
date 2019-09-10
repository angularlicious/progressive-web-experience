import { Component, OnInit, Input } from '@angular/core';
import { VideoCourse } from '@angularlicious/lms-common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ComponentBase } from '@angularlicious/foundation';
import { LoggingService, Severity } from '@angularlicious/logging';
import { Router } from '@angular/router';

@Component({
  selector: 'lms-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.css'],
})
export class VideoCardComponent extends ComponentBase implements OnInit {
  @Input() course: VideoCourse;
  safeUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer, loggingService: LoggingService, router: Router) {
    super('VideoCardComponent', loggingService, router);
  }

  ngOnInit() {
    if (this.course && this.course.videoUrl) {
      this.loggingService.log(this.componentName, Severity.Information, `Preparing to sanitize the video url: ${this.course.videoUrl}`);
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.course.videoUrl);
      this.loggingService.log(this.componentName, Severity.Information, `Finished sanitizing the video url: ${this.safeUrl}`);
    }
  }
}
