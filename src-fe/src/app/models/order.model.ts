import {IProduct} from "./product.model";

export interface IOrder {
  _id: number | string;
  userId: string;
  status: string;
  products: string[];
}

export interface IUpdatedUserOrderFromBE {
  value: IOrder;
  statusMessage: string;
}

// export interface IProductOrder extends IOrder {
//   products: IProduct[];
//   status: string;
// }
