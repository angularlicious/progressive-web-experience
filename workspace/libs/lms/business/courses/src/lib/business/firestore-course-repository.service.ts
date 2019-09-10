import { Injectable } from '@angular/core';
import { ServiceBase, SuccessApiResponse } from '@angularlicious/foundation';

import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { LoggingService } from '@angularlicious/logging';
import { Observable } from 'rxjs';
import { VideoCourse } from '@angularlicious/lms-common';
import { map } from 'rxjs/operators';

@Injectable()
export class FirestoreCourseRepositoryService extends ServiceBase {
  private VIDEOS = 'videos';

  private videoCourseCollection: AngularFirestoreCollection<VideoCourse>;
  private videoCourses$: Observable<any> = new Observable<VideoCourse[]>(null);

  constructor(private firestore: AngularFirestore, loggingService: LoggingService) {
    super('FirestoreCourseRepositoryService', loggingService);
  }

  public retrieveLatestCourses<T>(): Observable<T> {
    this.videoCourseCollection = this.firestore.collection(this.VIDEOS);
    this.videoCourses$ = this.videoCourseCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(snapshot => {
          const data = snapshot.payload.doc.data();
          const id = snapshot.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    return this.videoCourses$;
  }
}
