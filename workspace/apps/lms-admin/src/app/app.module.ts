import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

import { AppRoutingModule } from './modules/app-routing/app-routing.module';
import { SharedModule } from './modules/shared/shared.module';
import { SiteModule } from './modules/site/site.module';
import { CrossCuttingModule } from './modules/cross-cutting/cross-cutting.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConsoleLoggerModule } from '@angularlicious/console-logger';
@NgModule({
  imports: [CrossCuttingModule.forRoot(), ConsoleLoggerModule.forRoot({ name: 'PWX2019' }), SharedModule, SiteModule, AppRoutingModule, BrowserAnimationsModule],
  declarations: [AppComponent, AdminLayoutComponent],
  exports: [],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
