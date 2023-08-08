import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from "rxjs";

import { IUser } from '../../models';
import { UserFacadeService } from '../../store/user';
import { AdminFacadeService } from '../../store/admin';

import { RoutesConfig } from '../../../configs/routes';

import { AutoCloseable } from '../../utils/auto-closable';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'guitar-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent extends AutoCloseable implements OnInit {
  public homeUrl: string;
  public user: IUser;

  constructor(
    public router: Router,
    private translateService: TranslateService,
    private changeDetectorRefs: ChangeDetectorRef,
    private userFacade: UserFacadeService,
    private adminFacade: AdminFacadeService
  ) {
    super();
  }

  ngOnInit(): void {
    this.homeUrl = RoutesConfig.home;
    this.refresh();
  }

  refresh() {
    this.userFacade.userLogin$.pipe(
      takeUntil(this.destroyedSource),
    ).subscribe(
      (user: IUser) => {
        this.user = user;
        this.changeDetectorRefs.detectChanges();
      }
    );
  }

  logout() {
    this.userFacade.userLogout();
    this.userFacade.resetUserBasket();
    this.adminFacade.resetUsers();
    this.adminFacade.resetBaskets();
    this.adminFacade.resetOrders();
  }

  changeLang(lang):void {
    this.translateService.use(lang);
    this.checkLang(lang);
  }

  public checkLang(lang):boolean {
    return this.translateService.currentLang === lang;
  }
}
