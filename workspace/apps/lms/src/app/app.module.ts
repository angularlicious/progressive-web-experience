import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './modules/shared/shared.module';
import { CoreModule } from './modules/core/core.module';
import { CrossCuttingModule } from './modules/cross-cutting/cross-cutting.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './modules/site/footer/footer.component';
import { SidebarComponent } from './modules/site/sidebar/sidebar.component';
import { NavbarComponent } from './modules/site/navbar/navbar.component';

@NgModule({
  declarations: [AppComponent, FooterComponent, SidebarComponent, NavbarComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CrossCuttingModule,
    SharedModule,
    CoreModule,
    BrowserAnimationsModule,
  ],
  exports: [SharedModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
