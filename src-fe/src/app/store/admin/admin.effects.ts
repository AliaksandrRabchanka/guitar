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

import {IBasket, IOrder, IUpdatedUserOrderFromBE, IUser, IUserOrderDataFromBE} from '../../models';
import { AdminService } from '../../services';

import * as AdminActions from './admin.actions';
import * as AdminFacadeService from './admin.facade';
import { IAppState } from '..';
import * as UserActions from "../user/user.actions";

@Injectable()
export class AdminEffects {
  constructor(
    private actions$: Actions,
    private store: Store<IAppState>,
    private admin: AdminService,
  ){}

  getUsers$ = createEffect(() => this.actions$.pipe(
    ofType(AdminActions.getUsers),
    switchMap(
      () => this.admin.getUsers().pipe(
        map((users: IUser[]) => AdminActions.getUsersSuccess(
          { users }
        )),
        catchError((error: HttpErrorResponse) => of(AdminActions.getUsersFailed(
          { message: error.message }
        ))),
      ),
    ),
  ));

  resetUsers$ = createEffect(() => this.actions$.pipe(
    ofType(AdminActions.resetUsers),
    map(() => AdminActions.resetUsersSuccess()),
  ));

  getBaskets$ = createEffect(() => this.actions$.pipe(
    ofType(AdminActions.getBaskets),
    switchMap(
      () => this.admin.getBaskets().pipe(
        map((baskets: IBasket[]) => AdminActions.getBasketsSuccess(
          { baskets }
        )),
        catchError((error: HttpErrorResponse) => of(AdminActions.getBasketsFailed(
          { message: error.message }
        ))),
      ),
    ),
  ));

  resetBaskets$ = createEffect(() => this.actions$.pipe(
    ofType(AdminActions.resetBaskets),
    map(() => AdminActions.resetBasketsSuccess()),
  ));

  getOrders$ = createEffect(() => this.actions$.pipe(
    ofType(AdminActions.getOrders),
    switchMap(
      () => this.admin.getOrders().pipe(
        map((ordersFromBE: IOrder[]): Action => {
          const orders: Map<string, IOrder[]> = new Map();
          ordersFromBE.forEach((order) => {
            if (orders.has(order.userId)) {
              orders.set(order.userId, [...orders.get(order.userId), order])
            } else {
              orders.set(order.userId, [order])
            }
          });
          return AdminActions.getOrdersSuccess(
            { orders }
          )
        }),
        catchError((error: HttpErrorResponse) => of(AdminActions.getOrdersFailed(
          { message: error.message }
        ))),
      ),
    ),
  ));

  resetOrders$ = createEffect(() => this.actions$.pipe(
    ofType(AdminActions.resetOrders),
    map(() => AdminActions.resetOrdersSuccess()),
  ));

  updateOrders$ = createEffect(() => this.actions$.pipe(
    ofType(AdminActions.updateOrders),
    switchMap(
      ({orderId, updateOrdersData}) => this.admin.updateOrders(orderId, updateOrdersData).pipe(
        map((data: HttpResponse<IUpdatedUserOrderFromBE>): Action => {
          // const order: Map<string, IOrder> = new Map();
          // ordersFromBE.forEach((order) => {
          //   if (orders.has(order.userId)) {
          //     order.set(value.userId, {products: value.products, status: value.status, userId: value.userId, _id: value._id})
          //   } else {
          //     orders.set(order.userId, [order])
          //   }
          // });
          // return AdminActions.getOrdersSuccess(
          //   { orders }
          // )
          return AdminActions.updateOrdersSuccess(
              { order: data.body.value, message: data.body.statusMessage }
            )
          }
        ),
        catchError((error: HttpErrorResponse) => of(AdminActions.processUpdateOrdersFailure(
          { message: error.message }
        )))
      )
    )
  ));
}
