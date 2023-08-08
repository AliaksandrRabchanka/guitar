import {Component, ChangeDetectionStrategy, Input, OnInit, ChangeDetectorRef, OnChanges} from '@angular/core';
import { Router } from '@angular/router';
import {combineLatest, takeUntil} from "rxjs";

import {IProduct, IUser, IBasket, IUpdateUserBasket} from '../../models';
import { UserFacadeService } from '../../store/user';
import { ShowcaseFacadeService } from '../../store/showcase';

import { AutoCloseable } from '../../utils/auto-closable';

@Component({
  selector: 'guitar-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasketComponent extends AutoCloseable implements OnInit, OnChanges {
  @Input() public user: IUser;
  @Input() public basket: string[];
  public selectedProducts: IProduct[];
  private products: IProduct[];

  constructor(
    private router: Router,
    private changeDetectorRefs: ChangeDetectorRef,
    private userFacade: UserFacadeService,
    private showcaseFacade: ShowcaseFacadeService,
  ) {
    super();
    combineLatest([
      this.showcaseFacade.products$
    ]).pipe(
      takeUntil(this.destroyedSource),
    )
      .subscribe(([products]: [products: IProduct[]]) => {
        this.products = products;
        this.refresh();
      });
  }

  ngOnChanges(): void {
    this.refresh();
  }

  ngOnInit(): void {
    this.showcaseFacade.getProducts();
    this.userFacade.getUserBasket(this.user._id);
  }

  public deleteProduct(productId: string): void {
    const updateUserBasketData:IUpdateUserBasket = {
      userId: this.user._id,
      productId: productId,
      operationType: 'delete'
    }
    this.userFacade.updateUserBasket(updateUserBasketData)
  }

  private refresh(): void {
    if (this.user && this.basket && this.products) {
      this.getSelectedProducts();
    }
    this.changeDetectorRefs.markForCheck();
  }

  private getSelectedProducts(): void {
    this.selectedProducts = this.basket?.reduce((acc: IProduct[], item: string) => {
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
