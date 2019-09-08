import { Component, OnInit, Input } from '@angular/core';
import { VideoCourse } from '@angularlicious/lms-common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'lms-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.css'],
})
export class VideoCardComponent implements OnInit {
  @Input() course: VideoCourse;
  safeUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    if (this.course && this.course.videoUrl) {
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.course.videoUrl);
    }
  }
}
