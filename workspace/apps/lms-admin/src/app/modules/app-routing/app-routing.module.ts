import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from '../../layouts/admin-layout/admin-layout.component';
import { HomeComponent } from '../site/home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticatedGuard, LoginComponent, NotAuthenticatedComponent, NotAuthorizedComponent } from '@angularlicious/security';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
    ],
  },
  {
    path: 'courses',
    component: AdminLayoutComponent, // use to wrap the application
    children: [
      {
        path: '',
        loadChildren: () => import(`@angularlicious/lms-features/courses`).then(m => m.LmsFeatureCoursesModule),
      },
    ],
    canActivate: [AuthenticatedGuard],
  },
  {
    path: 'security/login',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
      },
    ],
  },
  {
    path: 'security/not-authenticated',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        component: NotAuthenticatedComponent,
      },
    ],
  },
  {
    path: 'security/not-authorized',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        component: NotAuthorizedComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];

@NgModule({
  declarations: [],
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false,
    }),
    CommonModule,
  ],
})
export class AppRoutingModule {}
