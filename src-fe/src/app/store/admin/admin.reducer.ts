import { createReducer, on, Action, ActionReducer } from '@ngrx/store';

import {IBasket, IOrder, IUser} from '../../models';

import { IAdminState, adminInitialState } from './admin.state';
import * as AdminActions from './admin.actions';

const reducer: ActionReducer<IAdminState> = createReducer(
  adminInitialState,
  on(
    AdminActions.getUsersSuccess,
    (state: IAdminState, { users }: { users: IUser[] }): IAdminState => ({
      ...state,
      users,
    }),
  ),

  on(
    AdminActions.getBasketsSuccess,
    (state: IAdminState, { baskets }: { baskets: IBasket[] }): IAdminState => ({
      ...state,
      baskets,
    }),
  ),

  on(
    AdminActions.resetUsersSuccess,
    (state: IAdminState, {}): IAdminState => ({
      ...state,
      users: null,
    }),
  ),

  on(
    AdminActions.resetBasketsSuccess,
    (state: IAdminState, {}): IAdminState => ({
      ...state,
      baskets: null,
    }),
  ),

  on(
    AdminActions.getOrdersSuccess,
    (state: IAdminState, { orders }: { orders: Map<string, IOrder[]> }): IAdminState => ({
      ...state,
      orders,
    }),
  ),

  on(
    AdminActions.resetOrdersSuccess,
    (state: IAdminState, {}): IAdminState => ({
      ...state,
      orders: null,
    }),
  ),

  on(
    AdminActions.updateOrdersSuccess,
    (state: IAdminState, { order }: { order: IOrder }): IAdminState => {
      let { orders } = state;
      orders.get(order.userId).find((el) => {
        if (el._id === order._id) {
          el.status = order.status;
        }
      })
      return {
        ...state,
        orders
    }
    },
  ),
)

export function adminStateReducer(state: IAdminState, action: Action): IAdminState {
  return reducer(state, action);
}
