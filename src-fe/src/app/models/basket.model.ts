import {IUser} from "./user.model";

export interface IBasket {
  _id: number;
  userId: string;
  basket: string[];
}

export interface IUpdateUserBasket {
  userId: string;
  productId: string;
  operationType: string;
}

export interface IUpdatedUserBasketFromBE {
  value: IBasket;
  message: string;
}
