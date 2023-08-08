import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { UserFacadeService } from '../store/user';
import { IUser } from '../models';
import { RoutesConfig } from '../../configs/routes';

import { AutoCloseable } from '../utils/auto-closable';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard extends AutoCloseable implements CanActivate {
  public user: IUser;

  constructor(
    private router: Router,
    private userFacade: UserFacadeService
  ) {
    super();
    this.userFacade.userLogin$.subscribe(
      (user: IUser) => {
        this.user = user;
      },
    );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (!this.user) {
      this.router.navigate([`${RoutesConfig.login}`]);
      return of(false);
    }

    return of(true);
  }
}
