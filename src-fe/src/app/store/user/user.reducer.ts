import { createReducer, on, Action, ActionReducer } from '@ngrx/store';

import {IBasket, IOrder, IProduct, IUser, IUserOrderData} from '../../models';

import { IUserState, userInitialState } from './user.state';
import * as UserActions from './user.actions';

const reducer: ActionReducer<IUserState> = createReducer(
  userInitialState,
  on(
    UserActions.userLoginSuccess,
    (state: IUserState, { user }: { user: IUser}): IUserState => ({
      ...state,
      login: user,
    }),
  ),
  on(
    UserActions.userLogoutSuccess,
    (state: IUserState): IUserState => ({
      ...state,
      login: null,
    }),
  ),
  on(
    UserActions.getUserBasketSuccess,
    (state, { basket }): IUserState => ({
      ...state,
      basket: basket,
    }),
  ),
  on(
    UserActions.updateUserBasketSuccess,
    ( state: IUserState, {basket}:{ basket: IBasket } ): IUserState => ({
      ...state,
      basket,
    }),
  ),
  on(
    UserActions.resetUserBasketSuccess,
    (state:IUserState): IUserState => ({
      ...state,
      basket: null,
    }),
  ),
  on(
    UserActions.getUserOrderSuccess,
    ( state: IUserState, {orders}:{ orders: IUserOrderData[] } ): IUserState => ({
      ...state,
      orders: orders,
    }),
  ),
  on(
    UserActions.updateUserOrderSuccess,
    ( state: IUserState, {order, message}:{ order: IUserOrderData, message: string } ): IUserState => {
      const newOrders: IUserOrderData[] = [...state.orders];
      const index = newOrders.findIndex((stateOrder:IUserOrderData): boolean => stateOrder._id === order._id);

      newOrders[index] = order

      return {
        ...state,
        orders: [...newOrders],
      };
    },
  ),
  on(
    UserActions.createUserOrderSuccess,
    ( state: IUserState, {currentOrder}:{ currentOrder: string[] } ): IUserState => ({
      ...state,
      currentOrder: currentOrder,
    }),
  ),
  on(
    UserActions.resetUserOrderSuccess,
    (state:IUserState): IUserState => ({
      ...state,
      currentOrder: null,
    }),
  ),
  on(
    UserActions.updateCreateUserOrderSuccess,
    ( state: IUserState, {currentOrder}:{ currentOrder: string[] } ): IUserState => ({
      ...state,
      currentOrder,
    }),
  ),
  on(
    UserActions.submitUserOrderSuccess,
    ( state: IUserState, {basket}:{ basket: IBasket } ): IUserState => ({
      ...state,
      basket,
    }),
  ),
)

export function userStateReducer(state: IUserState, action: Action): IUserState {
  return reducer(state, action);
}
