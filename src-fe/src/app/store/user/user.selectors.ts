import { createFeatureSelector, createSelector, MemoizedSelector, } from '@ngrx/store';
import { IAppState } from '..';

import {IBasket, IOrder, IUser, IUserOrderData} from '../../models';

import { IUserState, userKey } from './user.state';

export const UserFeatureSelector: MemoizedSelector<IAppState, IUserState> = createFeatureSelector<IAppState, IUserState>(
  userKey,
);

export const selectLoginUser: MemoizedSelector<IAppState, IUser> = createSelector(
  UserFeatureSelector,
  (state: IUserState): IUser => state.login,
);

export const selectLogoutUser: MemoizedSelector<IAppState, IUser> = createSelector(
  UserFeatureSelector,
  (state: IUserState): IUser => state.login,
);

export const selectUserBasket = createSelector(
  UserFeatureSelector,
  (state: IUserState): IBasket => state.basket,
);

export const selectResetUserBasket: MemoizedSelector<IAppState, IBasket> = createSelector(
  UserFeatureSelector,
  (state: IUserState): IBasket => state.basket,
);

export const selectUpdateUserBasket: MemoizedSelector<IAppState, IBasket> = createSelector(
  UserFeatureSelector,
  (state: IUserState): IBasket => state.basket,
);

export const selectUserOrder = createSelector(
  UserFeatureSelector,
  (state: IUserState): IUserOrderData[] => state.orders,
);

export const selectUpdateUserOrder: MemoizedSelector<IAppState, IUserOrderData[]> = createSelector(
  UserFeatureSelector,
  (state: IUserState): IUserOrderData[] => state.orders,
);

export const selectCreateUserOrder = createSelector(
  UserFeatureSelector,
  (state: IUserState): string[] => state.currentOrder,
);

export const selectUpdateCreateUserOrder: MemoizedSelector<IAppState, string[]> = createSelector(
  UserFeatureSelector,
  (state: IUserState): string[] => state.currentOrder,
);

export const selectResetUserOrder: MemoizedSelector<IAppState, string[]> = createSelector(
  UserFeatureSelector,
  (state: IUserState): string[] => state.currentOrder,
);

export const selectSubmitUserOrder: MemoizedSelector<IAppState, string[]> = createSelector(
  UserFeatureSelector,
  (state: IUserState): string[] => state.currentOrder,
);
