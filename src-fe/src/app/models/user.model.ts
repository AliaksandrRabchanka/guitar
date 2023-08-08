import {IOrder} from "./order.model";

export interface IUser {
  _id?: string;
  login: string;
  email: string;
  isAdmin?: boolean;
  basket?: string[];
  password?: string;
  newUser?: boolean;
}

export interface IUserFromBE {
  value: IUser;
  statusMessage: string;
}

export interface IUserOrderData {
  _id?: string;
  userId: string;
  products: string[];
  status: string;
}

export interface IUserOrderDataFromBE {
  value: IUserOrderData;
  message: string;
}
