import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ErrorRoutes, RoutesConfig } from '../configs/routes'
import { AdminGuard, LoginGuard } from './guards';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: RoutesConfig.home,
      },
      {
        path: RoutesConfig.login,
        pathMatch: 'full',
        loadChildren: () => import('./pages/login-page/login-page.module').then((m) => m.LoginPageModule),
      },
      {
        path: RoutesConfig.home,
        pathMatch: 'full',
        loadChildren: () => import('./pages/home-page/home-page.module').then((m) => m.HomePageModule),
      },
      {
        path: RoutesConfig.showcase,
        pathMatch: 'full',
        loadChildren: () => import('./pages/showcase-page/showcase-page.module').then((m) => m.ShowcasePageModule),
      },
      {
        path: RoutesConfig.basket,
        canActivate: [LoginGuard],
        pathMatch: 'full',
        loadChildren: () => import('./pages/basket-page/basket-page.module').then((m) => m.BasketPageModule),
      },
      {
        path: RoutesConfig.order,
        canActivate: [LoginGuard],
        pathMatch: 'full',
        loadChildren: () => import('./pages/order-page/order-page.module').then((m) => m.OrderPageModule),
      },
      {
        path: RoutesConfig.admin,
        canActivate: [LoginGuard, AdminGuard],
        pathMatch: 'full',
        loadChildren: () => import('./pages/admin-page/admin-page.module').then((m) => m.AdminPageModule),
      },
      {
        path: RoutesConfig.chat,
        pathMatch: 'full',
        loadChildren: () => import('./pages/chat-page/chat-page.module').then((m) => m.ChatPageModule),
      },
    ],
  },
  {
    path: RoutesConfig.error,
    children: [
      {
        path: ErrorRoutes.serverInternalError,
        loadChildren: () => import('./pages/error-page/error-page.module').then((m) => m.ErrorPageModule),
      },
      {
        path: ErrorRoutes.notEnoughPermissions,
        loadChildren: () => import('./pages/error-page/error-page.module').then((m) => m.ErrorPageModule),
      },      {
        path: ErrorRoutes.notFound,
        loadChildren: () => import('./pages/error-page/error-page.module').then((m) => m.ErrorPageModule),
      },
      {
        path: ErrorRoutes.accessDenied,
        loadChildren: () => import('./pages/error-page/error-page.module').then((m) => m.ErrorPageModule),
      }
    ],
  },
  {
    path: '**',
    redirectTo: `${RoutesConfig.error}/${ErrorRoutes.notFound}`,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
