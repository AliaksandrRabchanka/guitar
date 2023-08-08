import { createAction, props, Action } from '@ngrx/store';

import {IBasket, IOrder, IUpdateUserBasket, IUser, IUserOrderData, IUserOrderDataFromBE} from '../../models';

export const userLogin = createAction(
  '[User API] User login',
  props<{ user: IUser }>()
);

export const userLoginSuccess = createAction(
  '[User API] Successfully user login',
  props<{
    user: IUser;
    message: string;
  }>(),
);

export const processUserLoginFailed = createAction(
  '[User API] Failed to process user login',
  props<{ message: string }>(),
);

export const userLogout = createAction(
  '[User API] User logout',
);

export const userLogoutSuccess = createAction(
  '[User API] Successfully user logout',
);

export const getUserBasket = createAction(
  '[User API] Get user basket',
  props<{ userId: string }>(),
);

export const getUserBasketSuccess = createAction(
  '[User API] Successfully get user basket',
  props<{ basket: IBasket }>(),
);

export const getUserBasketFailure = createAction(
  '[User API] get user basket failed',
  props<{ message: string }>(),
);

export const updateUserBasket = createAction(
  '[User API] Update user basket',
  props<{ updateUserBasketData: IUpdateUserBasket }>(),
);

export const updateUserBasketSuccess = createAction(
  '[User API] Successfully update user basket',
  props<{
    basket: IBasket;
    message: string;
  }>(),
);

export const processUpdateUserBasketFailure = createAction(
  '[User API] Update user basket failed',
  props<{ message: string }>(),
);

export const resetUserBasket = createAction(
  '[User API] reset user basket',
);

export const resetUserBasketSuccess = createAction(
  '[User API] Successfully reset user basket',
);

export const deleteUserBasket = createAction(
  '[User API] Delete user basket',
  props<{ userId: string; }>(),
);

export const deleteUserBasketSuccess = createAction(
  '[User API] Delete user basket success',
  props<{
    userId: string;
    message: string;
  }>(),
);

export const deleteUserBasketFailure = createAction(
  '[User API] Delete user basket failed',
  props<{ message: string }>(),
);

export const getUserOrder = createAction(
  '[User API] Get user order',
  props<{ userId: string }>(),
);

export const getUserOrderSuccess = createAction(
  '[User API] Successfully get user order',
  props<{ orders: IUserOrderData[] }>(),
);

export const updateUserOrder = createAction(
  '[User API] Update user order',
  props<{
    orderId: string;
    updateUserOrderData: any;
  }>(),
);

export const updateUserOrderSuccess = createAction(
  '[User API] Successfully update user order',
  props<{
    order: IUserOrderData;
    message: string;
  }>(),
);

export const processUpdateUserOrderFailure = createAction(
  '[User API] Update user order failed',
  props<{ message: string }>(),
);

export const createUserOrder = createAction(
  '[User API] Create user order',
);

export const createUserOrderSuccess = createAction(
  '[User API] Successfully create user order',
  props<{ currentOrder: string[] }>(),
);

export const resetUserOrder = createAction(
  '[User API] reset user order',
);

export const resetUserOrderSuccess = createAction(
  '[User API] Successfully reset user order',
);

export const updateCreateUserOrder = createAction(
  '[User API] Update createUser order',
  props<{ productId: string }>(),
);

export const updateCreateUserOrderSuccess = createAction(
  '[User API] Successfully update createUser order',
  props<{ currentOrder: string[] }>(),
);

export const submitUserOrder = createAction(
  '[User API] Submit user order',
  props<{ userOrderData: IUserOrderData }>(),
);

export const submitUserOrderSuccess = createAction(
  '[User API] Successfully submit user order',
  props<{
    basket: IBasket;
    message: string;
  }>(),
);

export const processSubmitUserOrderFailure = createAction(
  '[User API] Submit user order failed',
  props<{ message: string }>(),
);
