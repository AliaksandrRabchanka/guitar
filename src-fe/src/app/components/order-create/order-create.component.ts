import { Component, ChangeDetectionStrategy, OnInit, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, takeUntil } from 'rxjs';

import { IProduct, IUser, IUserOrderData } from '../../models';
import { RoutesConfig } from '../../../configs/routes';

import { UserFacadeService } from '../../store/user';
import { ShowcaseFacadeService } from '../../store/showcase';

import { AutoCloseable } from '../../utils/auto-closable';

@Component({
  selector: 'guitar-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class OrderCreateComponent extends AutoCloseable implements OnInit {
  @Input() user: IUser;
  @Output() public showModal = new EventEmitter<any>();
  public order: string[];
  public selectedProducts: IProduct[];
  private products: IProduct[];

  constructor(
    private router: Router,
    private userFacade: UserFacadeService,
    private showcaseFacade: ShowcaseFacadeService,
    private changeDetectorRefs: ChangeDetectorRef,
  ) {
    super();
    combineLatest([
      this.userFacade.createUserOrder$,
      this.showcaseFacade.products$,
    ]).pipe(
      takeUntil(this.destroyedSource),
    )
      .subscribe(([order, products]:[basket: string[], products: IProduct[]]) => {
        this.order = order;
        this.products = products;
        this.changeDetectorRefs.markForCheck();
      });
  }

  ngOnInit(): void {
    this.showcaseFacade.getProducts();
    this.userFacade.createUserOrder();
    this.refresh();
  }

  public submit() {
    const userOrderData:IUserOrderData = {
      userId: this.user._id,
      products: this.order,
      status: 'created'
    }
    this.userFacade.submitUserOrder(userOrderData);
    this.userFacade.resetUserOrder();
    this.router.navigate([`${RoutesConfig.showcase}`]);
  }

  public goBack() {
    this.reset()
  }

  public deleteProductFromOrder(id: string) {
    this.userFacade.updateCreateUserOrder(id)

    if (!this.order.length) {
      this.reset()
    }
    this.getOrderProducts();
    this.changeDetectorRefs.markForCheck();
  }

  public reset() {
    this.userFacade.resetUserOrder();
    this.showModal.emit({});
  }

  private refresh(): void {
    if (this.user && this.order && this.products) {
      this.getOrderProducts();
    }
    this.changeDetectorRefs.markForCheck();
  }

  private getOrderProducts(): void {
    this.selectedProducts = this.order?.reduce((acc: IProduct[], item: string) => {
      this.products.forEach((product: IProduct) => {
          if (product._id === item) {
            acc.push(product)
          }
        }
      )
      return acc;
    }, []);
  }
}
