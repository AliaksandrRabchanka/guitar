import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { combineLatest, Observable, takeUntil } from 'rxjs';

import {IBasket, IOrder, IProduct, IUser} from '../../models';
import { AdminFacadeService } from '../../store/admin';

import { AutoCloseable } from '../../utils/auto-closable';
import { ShowcaseFacadeService } from '../../store/showcase';
import { UserFacadeService } from "../../store/user";

@Component({
  selector: 'guitar-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent extends AutoCloseable implements OnInit {
  public users: IUser[];
  private orders: Map<string, IOrder[]>;
  private products: IProduct[];

  constructor(
    private adminFacade: AdminFacadeService,
    private showcaseFacade: ShowcaseFacadeService,
    private userFacade: UserFacadeService,
    private changeDetectorRefs: ChangeDetectorRef,
  ) {
    super();
    combineLatest([
      this.adminFacade.users$,
      this.adminFacade.orders$,
      this.showcaseFacade.products$
    ]).pipe(
      takeUntil(this.destroyedSource),
    )
      .subscribe(([users, orders, products]: [users: IUser[], orders: Map<string, IOrder[]>, products: IProduct[]]) => {
        this.users = users;
        this.orders = orders;
        this.products = products;
        this.changeDetectorRefs.markForCheck();
      });
  }

  ngOnInit(): void {
    this.adminFacade.getUsers();
    this.adminFacade.getOrders();
    this.showcaseFacade.getProducts();
  }

  public userOrders(userId): Array<any> {
   const userOrders = [];
    if (!this.orders?.has(userId)) return userOrders;

    this.orders.get(userId)?.forEach((userOrder: IOrder) => {
     const order = {};
     order['_id'] = userOrder._id;
     order['status'] = userOrder.status;
     order['products'] = userOrder.products.reduce((acc: IProduct[], item: string) => {
        this.products?.forEach((product: IProduct) => {
            if (product._id === item) {
              acc.push(product)
            }
          }
        )
        return acc;
      }, []);
      userOrders.push(order);
    });
   return userOrders;
  }

  public changeOrder(productId: string, orderStatus: string) {
    const updateUserOrderData: Object = {
      status: orderStatus
    }
    this.adminFacade.updateOrders(productId, updateUserOrderData);
  }
}
