import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable, BehaviorSubject, Subject, Subscription, combineLatest, takeUntil,} from 'rxjs';

import { IProduct, IUser } from '../../models';
import { ShowcaseFacadeService } from '../../store/showcase';
import { UserFacadeService } from '../../store/user';

import { AutoCloseable } from '../../utils/auto-closable';
import * as ShowcaseSelectors from "../../store/showcase/showcase.selectors";

@Component({
  selector: 'guitar-showcase-page',
  templateUrl: './showcase-page-page.component.html',
  styleUrls: ['./showcase-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowcasePageComponent extends AutoCloseable implements OnInit {
  public user: IUser;
  public products: IProduct[];
  public product: IProduct;
  public increase: boolean;
  public showWindow = false;
  public filterString = '';

  constructor(
    private changeDetectorRefs: ChangeDetectorRef,
    private userFacade: UserFacadeService,
    private showcaseFacade: ShowcaseFacadeService
  ) {
    super();
    combineLatest([
      this.userFacade.userLogin$,
      this.showcaseFacade.products$
    ]).pipe(
      takeUntil(this.destroyedSource),
    )
      .subscribe(([user, products]:[user:IUser, products:IProduct[]]) => {
        this.user = user;
        this.products = products;
        this.changeDetectorRefs.markForCheck();
      });
  }

  ngOnInit(): void {
    this.showcaseFacade.getProducts();
  }

  public sort() {
    if (this.increase) {
      this.products = this.products.sort((a,b) => b.price - a.price);
    } else {
      this.products = this.products.sort((a,b) => a.price - b.price);
    }
    this.increase = !this.increase;
  }

  public showModalWindow($event: any):void {
      this.product = {
        _id: $event._id || null,
        title: $event.title || null,
        image: $event.image || null,
        description: $event.description || null,
        price: $event.price || null
      }
    this.showWindow = !this.showWindow;
  }

  public closeModal(product) {
    this.product = {
      ...this.product,
      title: product.title,
      image: product.image,
      description: product.description,
      price: product.price
    }

    if (Object.keys(product).length) {
      this.showcaseFacade.updateProduct(this.product);
    }
    // TODO: switch to store
    this.showcaseFacade.getProducts();
    this.showWindow = !this.showWindow;
  }

  public deleteProduct(productId: string): void {
    this.showcaseFacade.deleteProduct(productId);
    this.showcaseFacade.products$;
  }
}
