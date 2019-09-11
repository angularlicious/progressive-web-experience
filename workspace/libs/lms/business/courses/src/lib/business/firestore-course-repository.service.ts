import { Injectable } from '@angular/core';
import { ServiceBase, SuccessApiResponse } from '@angularlicious/foundation';

import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { LoggingService } from '@angularlicious/logging';
import { Observable } from 'rxjs';
import { Course, Video } from '@angularlicious/lms-common';
import { map } from 'rxjs/operators';

@Injectable()
export class FirestoreCourseRepositoryService extends ServiceBase {
  private COURSES = 'courses';
  private VIDEOS = 'videos';

  private courseCollection: AngularFirestoreCollection<Course>;
  private courses$: Observable<any> = new Observable<Course[]>(null);

  private videoCollection: AngularFirestoreCollection<Video>;
  private videos$: Observable<any> = new Observable<Video[]>(null);

  constructor(private firestore: AngularFirestore, loggingService: LoggingService) {
    super('FirestoreCourseRepositoryService', loggingService);
  }

  public retrieveLatestCourses<T>(): Observable<T> {
    this.courseCollection = this.firestore.collection(this.COURSES);
    this.courses$ = this.courseCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(snapshot => {
          const data = snapshot.payload.doc.data();
          const id = snapshot.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    return this.courses$;
  }

  public retrieveLatestCourseVideos<T>(course: Course): Observable<T> {
    this.videoCollection = this.firestore
      .collection(this.COURSES)
      .doc(course.id)
      .collection(this.VIDEOS);
    this.videos$ = this.videoCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(snapshot => {
          const data = snapshot.payload.doc.data();
          const id = snapshot.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    return this.videos$;
  }
}
