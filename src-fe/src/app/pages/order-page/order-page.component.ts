import {Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef} from '@angular/core';
import {combineLatest, Observable, takeUntil} from 'rxjs';
import { Router } from "@angular/router";

import {IOrder, IProduct, IUpdateUserBasket, IUser, IUserOrderData} from '../../models';

import { UserFacadeService } from '../../store/user';

import { AutoCloseable } from '../../utils/auto-closable';
import { RoutesConfig } from '../../../configs/routes';
import {ShowcaseFacadeService} from "../../store/showcase";

@Component({
  selector: 'guitar-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class OrderPageComponent extends AutoCloseable implements OnInit {
  public user: IUser;
  public orders: IUserOrderData[];
  private products: IProduct[];

  constructor(
    private router: Router,
    private userFacade: UserFacadeService,
    private showcaseFacade: ShowcaseFacadeService,
    private changeDetectorRefs: ChangeDetectorRef,
  ) {
    super();
    combineLatest([
      this.userFacade.userLogin$,
      this.userFacade.userOrder$,
      this.showcaseFacade.products$
    ]).pipe(
      takeUntil(this.destroyedSource),
    )
      .subscribe(([user, orders, products]:[user:IUser, orders: IUserOrderData[], products: IProduct[]]) => {
        this.user = user;
        this.orders = orders;
        this.products = products;
        this.changeDetectorRefs.markForCheck();
      });
  }

  ngOnInit(): void {
    this.userFacade.getUserOrder(this.user._id);
    this.showcaseFacade.getProducts();
  }

  public submit() {
    // const userOrderData:IUserOrderData = {
    //   userId: this.user._id,
    //   products: this.orders,
    //   status: 'create'
    // }
    // this.userFacade.submitUserOrder(userOrderData);
    // this.userFacade.resetUserOrder();
    // this.router.navigate([`${RoutesConfig.showcase}`]);
  }

  public goBack() {
    this.reset()
  }

  public cancelOrder(productId: string) {
    const updateUserOrderData:any = {
      status: 'canceled'
    }
    this.userFacade.updateUserOrder(productId, updateUserOrderData)
  }

  public reset() {
    this.userFacade.resetUserOrder();
    this.router.navigate([`${RoutesConfig.basket}`]);
  }

  public getUserOrdersWithProducts(productIds: string[]): IProduct[] {
    return productIds.reduce((acc: IProduct[], item: string) => {
      this.products.forEach((product: IProduct) => {
          if (item === product._id) {
            acc.push(product)
          }
        }
      )
      return acc;
    }, []);
  }
}
