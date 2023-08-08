import {IBasket, IOrder, IUser} from '../../models';

export const adminKey = 'admin';

export interface IAdminState {
  users: IUser[]; // users for admin page
  baskets: IBasket[]; // user baskets
  orders: Map<string,IOrder[]>; // user orders
}

export const adminInitialState: IAdminState = {
  users: [],
  baskets: [],
  orders: new Map()
}
