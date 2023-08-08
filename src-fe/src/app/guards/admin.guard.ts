import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';

import { UserFacadeService } from '../store/user';
import { IUser } from '../models';
import { ErrorRoutes, RoutesConfig } from '../../configs/routes';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
   public user: IUser;

   constructor(
    private router: Router,
    private userFacade: UserFacadeService
  ) {
    this.userFacade.userLogin$.subscribe(
      (user: IUser) => {
        this.user = user;
      },
    );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (!this.user?.isAdmin) {
      this.router.navigate([`${RoutesConfig.error}/${ErrorRoutes.notEnoughPermissions}`]);
      return of(false);
    }

    return of(true);
  }
}
