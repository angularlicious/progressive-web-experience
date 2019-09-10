import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './modules/shared/shared.module';
import { CoreModule } from './modules/core/core.module';
import { CrossCuttingModule } from './modules/cross-cutting/cross-cutting.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddCourseComponent } from './features/add-course/add-course.component';

@NgModule({
  declarations: [AppComponent, AddCourseComponent],
  imports: [AppRoutingModule, BrowserModule, CrossCuttingModule, SharedModule, CoreModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
