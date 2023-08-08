import { createAction, props, Action } from '@ngrx/store';

import { IProduct } from '../../models';

export const getProducts = createAction(
  '[Showcase API] Get products',
);

export const getProductsSuccess = createAction(
  '[Showcase API] Successfully get products',
  props<{
    products: IProduct[]
  }>(),
);

export const getProductsFailure = createAction(
  '[Showcase API] get products failed',
  props<{ message: string }>(),
);

export const updateProduct = createAction(
  '[Showcase API] update product',
  props<{ product: IProduct }>()
);

export const updateProductSuccess = createAction(
  '[Showcase API] Successfully update product',
  props<{
    product: IProduct;
    message: string;
  }>(),
);

export const processUpdateProductFailed = createAction(
  '[Showcase API] Failed to process update product',
  props<{ message: string }>(),
);

export const deleteProduct = createAction(
  '[Showcase API] Delete product',
  props<{ productId: string }>(),
);

export const deleteProductSuccess = createAction(
  '[Showcase API] Deleting product success',
  props<{
    deletedID: string;
    message: string;
  }>(),
);

export const deleteProductFailure = createAction(
  '[Showcase API] Deleting product failed',
  props<{ message: string }>(),
);
