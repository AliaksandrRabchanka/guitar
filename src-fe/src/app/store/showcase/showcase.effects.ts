import { Injectable } from '@angular/core';
import { convertToParamMap, Router, UrlTree } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Store, select, Action } from '@ngrx/store';
import { of, Observable } from 'rxjs';
import {
  switchMap,
  map,
  withLatestFrom,
  exhaustMap,
  debounceTime,
  filter,
  tap,
  distinctUntilChanged,
  catchError,
} from 'rxjs/operators';

import { IProduct, IProductFromBE, IDeleteProductResponse  } from '../../models';
import { ProductsService } from '../../services';

import * as ShowcaseActions from './showcase.actions';
import * as ShowcaseFacadeService from './showcase.facade';
import { IAppState } from '..';

@Injectable()
export class ShowcaseEffects {
  constructor(
    private actions$: Actions,
    private store: Store<IAppState>,
    private productsService: ProductsService,
  ){}

  getProducts$ = createEffect(() => this.actions$.pipe(
    ofType(ShowcaseActions.getProducts),
    switchMap(
      () => this.productsService.getProducts().pipe(
        map((products: IProduct[]) => ShowcaseActions.getProductsSuccess(
          { products }
        )),
        catchError((error: HttpErrorResponse) => of(ShowcaseActions.getProductsFailure(
          { message: error.message }
        ))),
      ),
    ),
  ));

  updateProduct$ = createEffect(() => this.actions$.pipe(
    ofType(ShowcaseActions.updateProduct),
    switchMap(
      ({product}) => this.productsService.updateProduct(product).pipe(
        map((data: HttpResponse<IProductFromBE>) => ShowcaseActions.updateProductSuccess(
            {product: data.body.value, message: data.body.message}
          )
        ),
        catchError((error: HttpErrorResponse) => of(ShowcaseActions.processUpdateProductFailed(
          { message: error.message }
        )))
      )
    )
  ));

  deleteProduct$ = createEffect(() => this.actions$.pipe(
    ofType(ShowcaseActions.deleteProduct),
    switchMap(
      ( productId ) => this.productsService.deleteProduct(productId).pipe(
        map((data: HttpResponse<IDeleteProductResponse>) => ShowcaseActions.deleteProductSuccess(
          { deletedID: data.body.value.deletedID, message: data.body.statusMessage }
        )),
        catchError((error: HttpErrorResponse) => of(ShowcaseActions.deleteProductFailure({ message: error.message }))),
      ),
    ),
  ));
}
