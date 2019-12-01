import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService } from '@angularlicious/http-service';
import { BusinessProviderService } from './business/business-provider.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FirestoreCourseRepositoryService } from './business/firestore-course-repository.service';
import * as firebaseOptionsConfig from './firebaseOptions.json';

@NgModule({
  imports: [CommonModule, AngularFireModule.initializeApp(firebaseOptionsConfig), AngularFireAuthModule, AngularFirestoreModule],
  exports: [],
  providers: [BusinessProviderService, FirestoreCourseRepositoryService, HttpService],
})
export class LmsBusinessCoursesModule {}
