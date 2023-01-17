import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { FrontLayoutComponent } from './layouts/front-layout/front-layout.component';
import { GuardGuard } from './lib/guards/guard.guard';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
  {
    path: '',
    component: FrontLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./views/front/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'about',
        loadChildren: () =>
          import('./views/front/about/about.module').then((m) => m.AboutModule),
      },
      {
        path: 'contact',
        loadChildren: () =>
          import('./views/front/contact/contact.module').then(
            (m) => m.ContactModule
          ),
      },
      {
        path: 'login',
        loadChildren: () =>
          import('./views/front/login/login.module').then((m) => m.LoginModule),
      },
      {
        path: 'details/:id',
        loadChildren: () =>
          import('./views/front/details/details.module').then(
            (m) => m.DetailsModule
          ),
      },
      {
        path: 'startup',
        loadChildren: () =>
          import('./views/front/startup/startup.module').then(
            (m) => m.StartupModule
          ),
      },
    ],
  },
  {
    path: 'admin-layout',
    canActivate: [GuardGuard],
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./views/admin/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/admin/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'addstartup',
        loadChildren: () =>
          import('./views/admin/addstartup/addstartup.module').then(
            (m) => m.AddstartupModule
          ),
      },
      {
        path: 'request',
        loadChildren: () =>
          import('./views/admin/request/request.module').then(
            (m) => m.RequestModule
          ),
      },
      {
        path: 'update',
        loadChildren: () =>
          import('./views/admin/update/update.module').then(
            (m) => m.UpdateModule
          ),
      },

      {
        path: 'dashboard/update/:id',
        loadChildren: () =>
          import('./views/admin/update/update.module').then(
            (m) => m.UpdateModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./views/admin/profile/profile.module').then(
            (m) => m.ProfileModule
          ),
      },
    ],
  },
  { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
