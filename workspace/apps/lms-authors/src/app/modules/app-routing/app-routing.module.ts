import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from '../../layouts/admin-layout/admin-layout.component';
import { HomeComponent } from '../site/home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticatedGuard } from '@angularlicious/security';

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
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import(`@angularlicious/lms-features/courses`).then(m => m.LmsFeatureCoursesModule),
      },
    ],
    canActivate: [AuthenticatedGuard],
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
