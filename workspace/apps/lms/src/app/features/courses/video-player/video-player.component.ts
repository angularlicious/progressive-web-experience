import { Component, OnInit, Input } from '@angular/core';
import { VideoCourse } from '@angularlicious/lms-common';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'lms-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css'],
})
export class VideoPlayerComponent implements OnInit {
  @Input() course: VideoCourse;
  safeUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    if (this.course && this.course.videoUrl) {
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.course.videoUrl);
    }
  }
}
