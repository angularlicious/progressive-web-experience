import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SecurityModule } from '@angularlicious/security';
import { MaterialDesignModule } from '../material-design/material-design.module';
import { FoundationModule } from '@angularlicious/foundation';

const modules = [
  BrowserAnimationsModule,
  FormsModule,
  FoundationModule,
  HttpClientModule,
  MaterialDesignModule,
  NgbModule,
  ReactiveFormsModule,
  RouterModule,
  SecurityModule,
];

@NgModule({
  declarations: [],
  exports: [...modules, ToastrModule],
  imports: [CommonModule, ...modules, ToastrModule.forRoot()],
})
export class SharedModule {}
