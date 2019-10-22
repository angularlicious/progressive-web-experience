import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AuthProviderDialogComponent } from './components/auth-provider-dialog/auth-provider-dialog.component';
import { BusinessProviderService } from './business/business-provider.service';
import { FirestoreUsersRepositoryService } from './business/firestore-users-repository.service';
import { HttpService } from '@angularlicious/http-service';
import { FoundationModule } from '@angularlicious/foundation';

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
    FoundationModule,
  ],
  declarations: [AuthProviderDialogComponent],
  exports: [AuthProviderDialogComponent],
  entryComponents: [AuthProviderDialogComponent],
  providers: [BusinessProviderService, FirestoreUsersRepositoryService, HttpService],
})
export class SecurityModule {}
