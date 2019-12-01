import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService } from '@angularlicious/http-service';
import { BusinessProviderService } from './business/business-provider.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FirestoreCourseRepositoryService } from './business/firestore-course-repository.service';

const firebaseOptions = {
  apiKey: 'AIzaSyCcPPAdpUUuO3Kczc3LWyrYmwC8Ghxiwr0',
  authDomain: 'angular-architecture-web.web.app',
  databaseURL: 'https://angular-architecture-web.firebaseio.com',
  projectId: 'angular-architecture-web',
  storageBucket: 'angular-architecture-web.appspot.com',
  messagingSenderId: '',
};

@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(firebaseOptions),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  exports: [],
  providers: [BusinessProviderService, FirestoreCourseRepositoryService, HttpService],
})
export class LmsBusinessCoursesModule {}
