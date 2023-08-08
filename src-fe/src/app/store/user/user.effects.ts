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

import {IBasket, IOrder, IUpdatedUserBasketFromBE, IUpdatedUserOrderFromBE, IUserFromBE, IUserOrderData, IUserOrderDataFromBE} from '../../models';
import { BasketService, LoginService, OrderService } from '../../services';

import * as UserActions from './user.actions';
import { IAppState } from '..';
import * as UserSelectors from './user.selectors';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private store: Store<IAppState>,
    private loginService: LoginService,
    private basketService: BasketService,
    private orderService: OrderService,
  ){}

  userLogin$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.userLogin),
    exhaustMap(
      ({ user }) => this.loginService.userLogin(user).pipe(
        map((data: HttpResponse<IUserFromBE>) => UserActions.userLoginSuccess(
          { user: data.body.value, message: data.body.statusMessage }
        )),
        catchError((message: HttpErrorResponse) => of(UserActions.processUserLoginFailed(
          { message: message.error.statusMessage }
        ))),
      ),
    )
  ));

  userLogout$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.userLogout),
    map(() => UserActions.userLogoutSuccess()),
  ));

  getUserBasket$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.getUserBasket),
    exhaustMap(
      (userId) => {
        return this.basketService.getUserBasket(userId.userId).pipe(
          map((basket: IBasket) => UserActions.getUserBasketSuccess({ basket })),
        )
      },
    ),
  ));

  updateUserBasket$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.updateUserBasket),
    switchMap(
      ({updateUserBasketData}) => this.basketService.updateUserBasket(updateUserBasketData).pipe(
        map((data: HttpResponse<IUpdatedUserBasketFromBE>) => UserActions.updateUserBasketSuccess(
            {basket: data.body.value, message: data.body.message}
          )
        ),
        catchError((error: HttpErrorResponse) => of(UserActions.processUpdateUserBasketFailure(
          { message: error.message }
        )))
      )
    )
  ));

  resetUserBasket$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.resetUserBasket),
    map(() => UserActions.resetUserBasketSuccess()),
  ));

  getUserOrder$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.getUserOrder),
    exhaustMap(
      (userId) => {
        return this.orderService.getUserOrder(userId.userId).pipe(
          map((orders: IUserOrderData[]) => UserActions.getUserOrderSuccess({orders})),
        )
      },
    ),
    // withLatestFrom(
    //   this.store.pipe(select(UserSelectors.selectUserBasket)),
    // ),
    // map(
    //   ([,basket]:[any, IBasket]) => UserActions.getUserOrderSuccess({order: basket.basket}))
  ));

  updateUserOrder$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.updateUserOrder),
    // withLatestFrom(
    //   this.store.pipe(select(UserSelectors.selectCreateUserOrder)),
    // ),
    // map(
    //   ([productId, currentOrder]:[{productId: string}, string[]]): Action => {
    //     return UserActions.updateCreateUserOrderSuccess(
    //       { currentOrder: currentOrder.filter((el:string) => productId.productId !== el) }
    //     )
    //   })
    switchMap(
      ({orderId, updateUserOrderData}) => this.orderService.updateUserOrder(orderId, updateUserOrderData).pipe(
        map((data: HttpResponse<IUserOrderDataFromBE>) => UserActions.updateUserOrderSuccess(
            {order: data.body.value, message: data.body.message}
          )
        ),
        catchError((error: HttpErrorResponse) => of(UserActions.processUpdateUserOrderFailure(
          { message: error.message }
        )))
      )
    )
  ));

  createUserOrder$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.createUserOrder),
    withLatestFrom(
      this.store.pipe(select(UserSelectors.selectUserBasket)),
    ),
    map(
      ([,basket]:[any, IBasket]) => UserActions.createUserOrderSuccess({currentOrder: basket.basket}))
  ));

  updateCreateUserOrder$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.updateCreateUserOrder),
    withLatestFrom(
      this.store.pipe(select(UserSelectors.selectCreateUserOrder)),
    ),
    map(
      ([productId, currentOrder]:[{productId: string}, string[]]): Action => {
        return UserActions.updateCreateUserOrderSuccess(
          { currentOrder: currentOrder.filter((el:string) => productId.productId !== el) }
        )
      })
  ));

  resetUserOrder$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.resetUserOrder),
    map(() => UserActions.resetUserOrderSuccess()),
  ));

  submitUserOrder$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.submitUserOrder),
    switchMap(
      ({userOrderData}) => {
        return this.orderService.submitUserOrder(userOrderData).pipe(
          map((data: HttpResponse<any>) => UserActions.submitUserOrderSuccess(
            {basket: data.body.value, message: data.body.message}
            )
          ),
          catchError((error: HttpErrorResponse) => of(UserActions.processSubmitUserOrderFailure(
            { message: error.message }
          )))
        )
      }
    )
  ));
}
