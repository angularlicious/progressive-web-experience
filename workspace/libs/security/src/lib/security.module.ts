import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AuthProviderDialog } from './components/auth-provider-dialog/auth-provider-dialog.component';

const firebaseOptions = {
  apiKey: 'AIzaSyCcPPAdpUUuO3Kczc3LWyrYmwC8Ghxiwr0',
  authDomain: 'angular-architecture-web.web.app',
  databaseURL: 'https://angular-architecture-web.firebaseio.com',
  projectId: 'angular-architecture-web',
  storageBucket: 'angular-architecture-web.appspot.com',
  messagingSenderId: '',
};

@NgModule({
  imports: [CommonModule, AngularFireModule.initializeApp(firebaseOptions), AngularFireAuthModule, AngularFirestoreModule],
  declarations: [AuthProviderDialog],
  exports: [AuthProviderDialog],
  entryComponents: [AuthProviderDialog],
})
export class SecurityModule {}
