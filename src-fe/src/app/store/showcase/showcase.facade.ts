import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IProduct } from '../../models';

import * as ShowcaseSelectors from './showcase.selectors';
import * as ShowcaseActions from './showcase.actions';
import { IAppState } from '..';

@Injectable({
  providedIn: 'root',
})
export class ShowcaseFacadeService {
  constructor(
    private store: Store<IAppState>,
  ) {
  }

  getProducts(): void {
    this.store.dispatch(ShowcaseActions.getProducts());
  }

  get products$(): Observable<IProduct[]> {
    return this.store.pipe(select(ShowcaseSelectors.selectProducts));
  }

  updateProduct(product: IProduct): void {
    this.store.dispatch(ShowcaseActions.updateProduct({ product }));
  }

  get updateProduct$(): Observable<IProduct[]> {
    return this.store.pipe(select(ShowcaseSelectors.selectUpdateProduct));
  }

  deleteProduct(productId): void {
    this.store.dispatch(ShowcaseActions.deleteProduct({ productId }));
  }

  // get deleteProduct$(): Observable<IProduct[]> {
  //   return this.store.pipe(select(ShowcaseSelectors.selectUpdateProduct));
  // }
}
