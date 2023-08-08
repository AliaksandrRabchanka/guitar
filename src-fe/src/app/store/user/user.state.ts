import {IBasket, IOrder, IUser, IUserOrderData} from '../../models';

export const userKey = 'user';

export interface IUserState {
  login: IUser; // user login
  basket: IBasket; // user basket
  currentOrder: string[]; // currently user order
  orders: IUserOrderData[] // user orders list
}

export const userInitialState: IUserState = {
  login: null,
  basket: null,
  currentOrder: null,
  orders: null,
}
