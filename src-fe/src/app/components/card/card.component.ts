import {Component, ChangeDetectionStrategy, Input, OnInit, ChangeDetectorRef, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, takeUntil } from "rxjs";

import { IBasket, IProduct, IUpdateUserBasket, IUser } from '../../models';
import { UserFacadeService } from '../../store/user';

import { AutoCloseable } from "../../utils/auto-closable";

@Component({
  selector: 'guitar-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent extends AutoCloseable implements OnInit {
  @Input() public product: IProduct;
  @Output() public onShowModalWindow = new EventEmitter<any>();
  @Output() public onDeleteProduct = new EventEmitter<any>();
  public user: IUser;
  public basket: string[];
  public image: string;

  constructor(
    private router: Router,
    private changeDetectorRefs: ChangeDetectorRef,
    private userFacade: UserFacadeService,
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
    if (this.user) {
      this.userFacade.getUserBasket(this.user?._id);
    }
    this.image = this.product && this.product.image ? atob(this.product.image.value) : './assets/images/no-image.png';
  }

  selectProduct(productId): void {
    let operationType: string;

    if (this.basket?.includes(productId)) {
      operationType = 'delete';
    } else {
      operationType = 'add';

    }
    const updateUserBasketData:IUpdateUserBasket = {
      userId: this.user._id,
      productId: productId,
      operationType: operationType
    }
    this.userFacade.updateUserBasket(updateUserBasketData);
    this.changeButtonStyle(productId);
  }

  changeButtonStyle(productId): boolean {
    return this.basket?.includes(productId);
  }

  editProduct(product: IProduct) {
    this.onShowModalWindow.emit(product);
  }

  deleteProduct(productId: string) {
    this.onDeleteProduct.emit(productId);
  }
}
