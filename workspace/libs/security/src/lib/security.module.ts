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
import { LoginComponent } from './components/login/login.component';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';
import { NotAuthenticatedComponent } from './components/not-authenticated/not-authenticated.component';
import { RouterModule } from '@angular/router';

const firebaseOptions = {
  apiKey: 'AIzaSyCcPPAdpUUuO3Kczc3LWyrYmwC8Ghxiwr0',
  authDomain: 'angular-architecture-web.web.app',
  databaseURL: 'https://angular-architecture-web.firebaseio.com',
  projectId: 'angular-architecture-web',
  storageBucket: 'angular-architecture-web.appspot.com',
  messagingSenderId: '',
};

const exportComponents = [AuthProviderDialogComponent, LoginComponent, NotAuthenticatedComponent, NotAuthorizedComponent];

@NgModule({
  imports: [CommonModule, AngularFireModule.initializeApp(firebaseOptions), AngularFireAuthModule, AngularFirestoreModule, FoundationModule, RouterModule],
  declarations: [...exportComponents, NotAuthorizedComponent, NotAuthenticatedComponent],
  exports: [...exportComponents],
  entryComponents: [AuthProviderDialogComponent],
  providers: [BusinessProviderService, FirestoreUsersRepositoryService, HttpService],
})
export class SecurityModule {}
