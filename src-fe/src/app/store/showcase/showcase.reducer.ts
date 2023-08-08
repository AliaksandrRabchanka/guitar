import { createReducer, on, Action, ActionReducer } from '@ngrx/store';

import { IProduct } from '../../models';

import { IShowcaseState, showcaseInitialState } from './showcase.state';
import * as ShowcaseActions from './showcase.actions';

const reducer: ActionReducer<IShowcaseState> = createReducer(
  showcaseInitialState,
  on(
    ShowcaseActions.getProductsSuccess,
    (state: IShowcaseState, { products }: { products: IProduct[] }): IShowcaseState => ({
      ...state,
      products,
    }),
  ),

  on(
    ShowcaseActions.updateProductSuccess,
    ( state: IShowcaseState, {product}:{ product: IProduct} ): IShowcaseState => {
      const index  = state.products.findIndex((el: IProduct) => el._id === product._id);

      if (index !== -1) {
        state.products[index] = {...product};
        return {
          ...state,
        };
      }
      return {
        ...state,
        products: [...state.products, product]
      }
    },
  ),

  on(
    ShowcaseActions.deleteProductSuccess,
    (state: IShowcaseState, { deletedID, message }) => {
      const newProducts: IProduct[] = [...state.products];

      newProducts.splice(
        newProducts.findIndex((product): boolean => product._id === deletedID),
        1,
      );
      return {
        ...state,
        products: [...newProducts],
      };
    },
  ),
)

export function showcaseStateReducer(state: IShowcaseState, action: Action): IShowcaseState {
  return reducer(state, action);
}
