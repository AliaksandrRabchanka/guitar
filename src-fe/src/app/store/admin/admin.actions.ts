import { createAction, props, Action } from '@ngrx/store';

import {IBasket, IOrder, IUser, IUserOrderData} from '../../models';

//user actions
export const getUsers = createAction(
  '[Admin API] Get users',
);

export const getUsersSuccess = createAction(
  '[Admin API] Successfully get users',
  props<{
    users: IUser[];
  }>(),
);

export const getUsersFailed = createAction(
  '[Admin API] Failed to process get users',
  props<{ message: string }>(),
);

export const resetUsers = createAction(
  '[Admin API] reset users',
);

export const resetUsersSuccess = createAction(
  '[Admin API] Successfully reset users',
);

//baskets actions
export const getBaskets = createAction(
  '[Admin API] Get baskets',
);

export const getBasketsSuccess = createAction(
  '[Admin API] Successfully get baskets',
  props<{
    baskets: IBasket[];
  }>(),
);

export const getBasketsFailed = createAction(
  '[Admin API] Failed to process get baskets',
  props<{ message: string }>(),
);

export const resetBaskets = createAction(
  '[Admin API] reset baskets',
);

export const resetBasketsSuccess = createAction(
  '[Admin API] Successfully reset baskets',
);

//orders actions
export const getOrders = createAction(
  '[Admin API] Get orders',
);

export const getOrdersSuccess = createAction(
  '[Admin API] Successfully get orders',
  props<{
    orders: Map<string, IOrder[]>;
  }>(),
);

export const getOrdersFailed = createAction(
  '[Admin API] Failed to process get orders',
  props<{ message: string }>(),
);

export const resetOrders = createAction(
  '[Admin API] reset orders',
);

export const resetOrdersSuccess = createAction(
  '[Admin API] Successfully reset orders',
);

export const updateOrders = createAction(
  '[Admin API] Update orders',
  props<{
    orderId: string;
    updateOrdersData: any;
  }>(),
);

export const updateOrdersSuccess = createAction(
  '[Admin API] Successfully update orders',
  props<{
    order: IOrder;
    message: string;
  }>(),
);

export const processUpdateOrdersFailure = createAction(
  '[Admin API] Update orders failed',
  props<{ message: string }>(),
);
