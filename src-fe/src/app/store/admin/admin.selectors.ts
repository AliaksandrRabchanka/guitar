import { createFeatureSelector, createSelector, MemoizedSelector, } from '@ngrx/store';
import { IAppState } from '..';

import {IBasket, IOrder, IUser, IUserOrderData} from '../../models';

import { IAdminState, adminKey } from './admin.state';
import {IUserState, UserFeatureSelector} from "../user";

export const AdminFeatureSelector: MemoizedSelector<IAppState, IAdminState> = createFeatureSelector<IAppState, IAdminState>(
  adminKey,
);

export const selectUsers: MemoizedSelector<IAppState, IUser[]> = createSelector(
  AdminFeatureSelector,
  (state: IAdminState): IUser[] => state.users,
);

export const selectResetUsers: MemoizedSelector<IAppState, IUser[]> = createSelector(
  AdminFeatureSelector,
  (state: IAdminState): IUser[] => state.users,
);

export const selectBaskets: MemoizedSelector<IAppState, IBasket[]> = createSelector(
  AdminFeatureSelector,
  (state: IAdminState): IBasket[] => state.baskets,
);

export const selectResetBaskets: MemoizedSelector<IAppState, IBasket[]> = createSelector(
  AdminFeatureSelector,
  (state: IAdminState): IBasket[] => state.baskets,
);

export const selectOrders: MemoizedSelector<IAppState, Map<string, IOrder[]>> = createSelector(
  AdminFeatureSelector,
  (state: IAdminState): Map<string, IOrder[]> => state.orders,
);

export const selectResetOrders: MemoizedSelector<IAppState, Map<string, IOrder[]>> = createSelector(
  AdminFeatureSelector,
  (state: IAdminState): Map<string, IOrder[]> => state.orders,
);

export const selectUpdateOrders: MemoizedSelector<IAppState, Map<string, IOrder[]>> = createSelector(
  AdminFeatureSelector,
  (state: IAdminState): Map<string, IOrder[]> => state.orders,
);
