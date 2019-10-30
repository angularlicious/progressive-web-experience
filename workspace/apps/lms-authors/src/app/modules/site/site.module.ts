import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SiteRoutingModule } from './site-routing.module';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserImageComponent } from './user-image/user-image.component';

const components = [FooterComponent, LoginComponent, NavbarComponent, SidebarComponent];

@NgModule({
  declarations: [...components, HomeComponent, UserImageComponent],
  exports: [...components],
  imports: [CommonModule, RouterModule, SharedModule, SiteRoutingModule],
})
export class SiteModule {}
