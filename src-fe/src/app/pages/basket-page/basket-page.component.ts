import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

import { combineLatest, Observable, takeUntil } from 'rxjs';

import { IBasket, IUser } from '../../models';

import { RoutesConfig } from '../../../configs/routes';

import { UserFacadeService } from '../../store/user';

import { AutoCloseable } from '../../utils/auto-closable';

@Component({
  selector: 'guitar-basket-page',
  templateUrl: './basket-page.component.html',
  styleUrls: ['./basket-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class BasketPageComponent extends AutoCloseable implements OnInit {
  public user: IUser;
  public basket: string[];
  public showModal= false;

  constructor(
    private router: Router,
    private userFacade: UserFacadeService,
    private changeDetectorRefs: ChangeDetectorRef,
  ) {
    super();
    combineLatest([
      this.userFacade.userLogin$,
      this.userFacade.userBasket$,
    ]).pipe(
      takeUntil(this.destroyedSource),
    )
      .subscribe(([user, basket]:[user:IUser, basket: IBasket]) => {
        this.user = user;
        this.basket = basket?.basket;
        this.changeDetectorRefs.markForCheck();
      });
  }

  ngOnInit(): void {
    this.userFacade.getUserBasket(this.user._id);
  }

  toOrder() {
    this.showModal = !this.showModal;
  }
}
