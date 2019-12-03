import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnumKeysPipe } from './pipes/enum-keys.pipe';
import { AlertNotifierComponent } from './components/alert-notifier/alert-notifier.component';
// import { LoginComponent } from '../../../security/src/lib/components/login/login.component';

@NgModule({
  imports: [CommonModule],
  declarations: [EnumKeysPipe, AlertNotifierComponent],
  exports: [EnumKeysPipe, AlertNotifierComponent],
})
export class ComponentsModule {}
