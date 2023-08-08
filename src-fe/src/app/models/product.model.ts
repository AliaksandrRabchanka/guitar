export interface IProduct {
  _id: string;
  title: string;
  image: any;
  price: number;
  description: string
}

export interface IProductFromBE {
  value: IProduct;
  message: string;
}

export interface IDeleteProductResponse {
  value: {
    deletedID: string
  };
  statusMessage: string;
}
