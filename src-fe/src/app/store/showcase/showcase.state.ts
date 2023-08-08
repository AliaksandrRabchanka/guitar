import { IProduct } from '../../models';

export const showcaseKey = 'showcase';

export interface IShowcaseState {
  products: IProduct[]; // products for showcase
}

export const showcaseInitialState: IShowcaseState = {
  products: [],
}
